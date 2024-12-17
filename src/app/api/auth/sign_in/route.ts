import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { accessSheet } from "@/lib/google-apis/sheets";
import { NextResponse } from "next/server";

const spreadsheetId = process.env.CUSTOMER_SPREADSHEET_ID as string
const generateToken=(id:string, period:string)=>{
    return sign({id},`${process.env.JWT_SECRET}`,{
        expiresIn:period || '10d'
    })
};

export async function POST(req: Request) {
    try{
        const { password,email, period } = await req.json()
        if(email&&password){
            const rows:any = await accessSheet(spreadsheetId, 'Sheet1!A1:J10')
            let rowIndex = -1; 
            for (let i = 0; i < rows.length; i++) { 
                if (rows[i][3] === email) { 
                    rowIndex = i; 
                    break; 
                } 
            } 
            if (rowIndex === -1) { 
                return NextResponse.json({error:`No user found, create account instead`},{status:404})
            }
            const data:any={
                'customer reference':rows[rowIndex][0],
                'photo':rows[rowIndex][1],
                'username':rows[rowIndex][2],
                'email':rows[rowIndex][3],
                'full name':rows[rowIndex][5],
                'phone number':rows[rowIndex][6],
                'location name':rows[rowIndex][7],
                'location lat_long':rows[rowIndex][8],
                'account balance':rows[rowIndex][9],
                'token':generateToken(rows[rowIndex][0],period)
            }

            if(data){
                if (data.email&&await compare(password,rows[rowIndex][4])) {
                    return NextResponse.json({
                        msg:`Welcome ${data['username']}`,
                        data
                    })
                }else if(await compare(password,rows[rowIndex][3])===false){
                    return NextResponse.json({error:'You have enter the wrong password'},{status:401})
                }
            }else{
                return NextResponse.json({error:`Account associated with email ${email} does not exist!`},{status:404})
            }
        }else {
            return NextResponse.json({ error: "Enter all the required fields" }, { status: 408 });
        }
    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}