import { accessSheet, deleteRows, updateRow } from "@/lib/google-apis/sheets";
import { NextRequest,NextResponse } from "next/server";

const spreadsheetId = `${process.env.BUSINESS_SPREADSHEET_ID}`

export async function GET(request: NextRequest, { params }: { params: Promise<{ referrence: string }>}) {
    try{
        const referrence = (await params).referrence
        const rows:any = await accessSheet(spreadsheetId, 'Sheet2!A1:N10')
        // Find the row index with the specific value 
        let rowIndex = -1; 
        for (let i = 0; i < rows.length; i++) { 
            if (rows[i][3] === referrence) { 
                rowIndex = i; 
                break; 
            } 
        } 
        if (rowIndex === -1) { 
            return NextResponse.json({error:`No record found`},{status:404})
        }
        const data:any= rows[rowIndex]
        console.log(data)
        if(data){
            console.log(data)
            return Response.json({message:`Business delete successfull`})
        }else{
            return NextResponse.json({error:`No record found`},{status:404})
        }
    }catch(error:any){
      console.error('Error:', error); // Return an error response
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ referrence: string }>}) {
    try{
        const referrence = (await params).referrence
        const rows:any = await accessSheet(spreadsheetId, 'Sheet2!A1:N10')
        // Find the row index with the specific value 
        let rowIndexToDelete = -1; 
        for (let i = 0; i < rows.length; i++) { 
            if (rows[i][3] === referrence) { 
                rowIndexToDelete = i; 
                break; 
            } 
        } 
        if (rowIndexToDelete === -1) { 
            return NextResponse.json({error:`No record found`},{status:404})
        }
        const data:any= await deleteRows(spreadsheetId , 'Sheet2', rowIndexToDelete, rowIndexToDelete+1)
        if(data){
            console.log(data)
            return Response.json({message:`Business delete successfull`})
        }else{
            return NextResponse.json({error:`No record found`},{status:404})
        }
    }catch(error:any){
      console.error('Error:', error); // Return an error response
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ referrence: string }>}) {
    try{
        const referrence = (await params).referrence
        // Clone the request body to avoid "Body is unusable" error 
        const requestBody = await request.clone().json(); 
        const { 
            product_photo,product_category,product_name,product_description,
            product_price,business_name,business_location, business_phone_number,
            business_till_number,business_paybill,business_paybill_account_number,
            business_location_photo,business_location_lat_long
        } = requestBody
        const rows:any = await accessSheet(spreadsheetId, 'Sheet2!A1:N10')
        // Find the row index with the specific value 
        let rowIndexToUpdate = -1; 
        for (let i = 0; i < rows.length; i++) { 
            if (rows[i][3] === referrence) { 
                rowIndexToUpdate = i + 1; // Adjust to 1-based index
                break; 
            } 
        } 
        if (rowIndexToUpdate === -1) { 
            return NextResponse.json({error:`No record found`},{status:404})
        }
        const range = `Sheet2!A${rowIndexToUpdate}:M${rowIndexToUpdate}`; // Adjust this to the range of the row you want to update 
        const values = [
            `REF-${rowIndexToUpdate}`,
            product_photo,product_category,product_name,product_description,
            product_price,business_name,business_location, business_phone_number,
            business_till_number,business_paybill,business_paybill_account_number,
            business_location_photo,business_location_lat_long
        ];
        const data:any= await updateRow(spreadsheetId, range,values)
        if(data){
            console.log(data)
            return Response.json({message:`Business details updated successfull`})
        }else{
            return NextResponse.json({error:`No record found`},{status:404})
        }
    }catch(error:any){
      console.error('Error:', error); // Return an error response
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}