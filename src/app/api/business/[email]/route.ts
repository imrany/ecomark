import { accessSheet, deleteRows } from "@/lib/google-apis/sheets";
import { NextRequest,NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ email: string }>}) {
    try{
        const email = (await params).email
        const spreadsheetId = '1gaMaxQuwgdlMvUKFRT6X_EsU_UnH0lVxlJXeKlZITOc'; // Replace with your Spreadsheet ID
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
            console.log('Value not found'); 
            return; 
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