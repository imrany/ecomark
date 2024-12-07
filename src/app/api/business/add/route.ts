import { writeDataToSheet, accessSheet } from "@/lib/google-apis/sheets";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const { 
            business_reference,
            business_name, business_owner, location_name, location_lat_long, business_description, 
            till_number, paybill, paybill_account_number, business_logo, location_photo, whatsapp_number, business_email
         } = await req.json()
        const spreadsheetId = '1gaMaxQuwgdlMvUKFRT6X_EsU_UnH0lVxlJXeKlZITOc'; // Replace with your Spreadsheet ID
        const rows:any = await accessSheet(spreadsheetId, 'Sheet1!A1:M10')
        for (let row of rows) { 
            console.log(row); 
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
        const values = [[business_reference,
            business_name, business_logo, business_email, business_owner, location_name, 
            location_photo,location_lat_long, business_description, 
            till_number, paybill, paybill_account_number, whatsapp_number
        ]]; 
        const result = await writeDataToSheet(spreadsheetId, range, values)
        return Response.json({
            message:"Record added successful",
            data:result
        })

    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}