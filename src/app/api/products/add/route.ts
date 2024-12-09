import { writeDataToSheet, accessSheet } from "@/lib/google-apis/sheets";
import { NextResponse } from "next/server";

const spreadsheetId = `${process.env.BUSINESS_SPREADSHEET_ID}`
export async function POST(req: Request) {
    try{
        const { 
            product_referrence,product_photo,product_category,product_name,product_description,
            product_price,business_name,business_location, business_phone_number,
            business_till_number,business_paybill,business_paybill_account_number,
            business_location_photo,business_location_lat_long
        } = await req.json()
        const rows:any = await accessSheet(spreadsheetId, 'Sheet2!A1:N10')
        for (let row of rows) { 
            console.log(row); 
            if (row.includes(`REF-${product_referrence}`)) { 
                return Response.json({
                    error:"A product with this referrence already exist.",
                }, { status: 200 })
            }
        }
        const range = `Sheet2!A${rows.length+1}`; 
        // Starting cell for data 
        const values = [[`REF-${rows.length+1}`,
            product_photo,product_category,product_name,product_description,
            product_price,business_name,business_location, business_phone_number,
            business_till_number,business_paybill,business_paybill_account_number,
            business_location_photo,business_location_lat_long
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