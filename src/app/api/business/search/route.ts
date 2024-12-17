import { NextRequest,NextResponse } from "next/server";
import { accessSheet } from "@/lib/google-apis/sheets";

const spreadsheetId = process.env.BUSINESS_SPREADSHEET_ID as string

// location is "food" for /api/business/search?location=nairobi
export async function GET(request: NextRequest) {
    try{
        const searchParams = request.nextUrl.searchParams
        const businessLocation = searchParams.get('location')
        const businessOwner = searchParams.get('owner')

        const rows: any = await accessSheet(spreadsheetId, 'Sheet1!A1:M10')
        const businesses=rows.slice(1)
        // Filter business by search
        const filteredBusinesss = businesses.filter((business: any) => {
            return ( 
                (!businessOwner || business[4].toUpperCase() === businessOwner.toUpperCase()) && 
                (!businessLocation || business[5].toUpperCase() === businessLocation.toUpperCase())
            ); 
        });

        const data=filteredBusinesss.map((business: any) => ({
            'Business Reference': business[0],
            'Business Name': business[1],
            'Business Logo': business[2],
            'Business Email': business[3],
            'Business Owner': business[4],
            'Location Name': business[5],
            'Location Photo': business[6],
            'Location lat_long': business[7],
            'Business Description': business[8],
            'Till number': business[9],
            'Paybill': business[10],
            'Paybill Account number': business[11],
            'Phone Number': business[12],
        }))
        if(filteredBusinesss.length>0){
            return NextResponse.json(data);
        }else{
            const error= businessOwner
                ? `Cannot find a business with owner ${businessOwner}`
                : `Cannot find a business under this location ${businessLocation}`
            return NextResponse.json({error},{ status : 404});
        }
    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}