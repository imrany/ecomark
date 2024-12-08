import { accessSheet, deleteRows, updateRow } from "@/lib/google-apis/sheets";
import { NextRequest,NextResponse } from "next/server";

const spreadsheetId = `${process.env.BUSINESS_SPREADSHEET_ID}`

export async function GET(request: NextRequest, { params }: { params: Promise<{ email: string }>}) {
    try{
        const email = (await params).email
        const rows:any = await accessSheet(spreadsheetId, 'Sheet1!A1:M10')
        // Find the row index with the specific value 
        let rowIndex = -1; 
        for (let i = 0; i < rows.length; i++) { 
            if (rows[i][3] === email) { 
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

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ email: string }>}) {
    try{
        const email = (await params).email
        const rows:any = await accessSheet(spreadsheetId, 'Sheet1!A1:M10')
        // Find the row index with the specific value 
        let rowIndexToDelete = -1; 
        for (let i = 0; i < rows.length; i++) { 
            if (rows[i][3] === email) { 
                rowIndexToDelete = i; 
                break; 
            } 
        } 
        if (rowIndexToDelete === -1) { 
            return NextResponse.json({error:`No record found`},{status:404})
        }
        const data:any= await deleteRows(spreadsheetId , 'Sheet1', rowIndexToDelete, rowIndexToDelete+1)
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


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ email: string }>}) {
    try{
        const email = (await params).email
        // Clone the request body to avoid "Body is unusable" error 
        const requestBody = await request.clone().json(); 
        const { 
            business_name, business_owner, location_name, location_lat_long, business_description, 
            till_number, paybill, paybill_account_number, business_logo, location_photo, phone_number
        } = requestBody
        const rows:any = await accessSheet(spreadsheetId, 'Sheet1!A1:M10')
        // Find the row index with the specific value 
        let rowIndexToUpdate = -1; 
        for (let i = 0; i < rows.length; i++) { 
            if (rows[i][3] === email) { 
                rowIndexToUpdate = i + 1; // Adjust to 1-based index
                break; 
            } 
        } 
        if (rowIndexToUpdate === -1) { 
            return NextResponse.json({error:`No record found`},{status:404})
        }
        const range = `Sheet1!A${rowIndexToUpdate}:M${rowIndexToUpdate}`; // Adjust this to the range of the row you want to update 
        const values = [
            `REF-${rowIndexToUpdate}`,
            business_name, business_logo, email, business_owner, location_name, 
            location_photo,location_lat_long, business_description, 
            till_number, paybill, paybill_account_number, phone_number
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