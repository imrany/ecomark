import { genSalt, hash } from "bcryptjs";
import { accessSheet, writeDataToSheet } from "@/lib/google-apis/sheets";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

const spreadsheetId = process.env.CUSTOMER_SPREADSHEET_ID as string

export async function PATCH(req: Request) {
    try{
        const { new_password,email } = await req.json()
        if(email&&new_password){
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

            const range = `Sheet1!A${rowIndex}`;
            const salt = await genSalt(10);
            const hashedPassword = await hash(new_password, salt); 
            const values = [[rows[rowIndex][0],
                rows[rowIndex][1],rows[rowIndex][2],rows[rowIndex][3],hashedPassword,rows[rowIndex][5],rows[rowIndex][6],rows[rowIndex][7],rows[rowIndex][8],rows[rowIndex][9]
            ]]; 
            await writeDataToSheet(spreadsheetId, range, values)
            let mailTranporter=createTransport({
                service:'gmail',
                auth:{
                    user:process.env.TRANSPORTER,
                    pass:process.env.TRANSPORTER_PASSWORD
                }
            });
            let details={
                from:process.env.TRANSPORTER,
                to:email,
                subject:`Account Update`,
                text:`Hello ${rows[rowIndex][2]}, \nYour account password was updated`
            }
            mailTranporter.sendMail(details,(err:any)=>{
                if(err){
                    console.log({error: "Cannot sent email, try again"})
                    return;
                }else{
                    return NextResponse.json({message:`Password updated`})
                }
            })
        }else {
            return NextResponse.json({ error: "Enter all the required fields" }, { status: 408 });
        }
    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}