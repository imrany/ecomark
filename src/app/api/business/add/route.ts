import { writeDataToSheet, accessSheet } from "@/lib/google-apis/sheets";
import { NextResponse } from "next/server";

const spreadsheetId = `${process.env.BUSINESS_SPREADSHEET_ID}`
export async function POST(req: Request) {
    try{
        const { 
            business_name, business_owner, location_name, location_lat_long, business_description, 
            till_number, paybill, paybill_account_number, business_logo, location_photo, phone_number, business_email
         } = await req.json()
        const rows:any = await accessSheet(spreadsheetId, 'Sheet1!A1:M10')
        for (let row of rows) { 
            if (row.includes(business_email)) { 
                return Response.json({
                    error:"A business with this email already exist.",
                }, { status: 200 })
            }else if(row.includes(business_name)){
                return Response.json({
                    error:"A business with this name already exist.",
                }, { status: 200 })
            }
        }
        const range = `Sheet1!A${rows.length+1}`; 
        // Starting cell for data 
        const values = [[`REF-${rows.length+1}`,
            business_name, business_logo, business_email, business_owner, location_name, 
            location_photo,location_lat_long, business_description, 
            till_number, paybill, paybill_account_number, phone_number
        ]]; 
        const result = await writeDataToSheet(spreadsheetId, range, values)
        return Response.json({
            message:"Record added successful",
        })

    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}