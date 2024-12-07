import { accessSheet } from "@/lib/google-apis/sheets";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try{
        const spreadsheetId = '1gaMaxQuwgdlMvUKFRT6X_EsU_UnH0lVxlJXeKlZITOc'; // Replace with your Spreadsheet ID
        const range = 'Sheet1!A1:M10'; // Adjust the range according to your sheet
        const result:any = await accessSheet(spreadsheetId, range)
        return Response.json({
            data:result,
            rows:result.length,
            columns:result[0].length,
        })
    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}