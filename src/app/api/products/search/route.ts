import { NextRequest,NextResponse } from "next/server";
import { accessSheet } from "@/lib/google-apis/sheets";

const spreadsheetId = process.env.BUSINESS_SPREADSHEET_ID as string

// category is "food" for /api/products/search?category=food
export async function GET(request: NextRequest) {
    try{
        const searchParams = request.nextUrl.searchParams
        const category = searchParams.get('category')
        const productName = searchParams.get('name')
        const productLocation = searchParams.get('location')
        const businessName = searchParams.get('business')

        const rows:any = await accessSheet(spreadsheetId, 'Sheet2!A1:N10')
        const products=rows.slice(1)
        // Filter products by search
        const filteredProducts = products.filter((product: any) => {
            return ( 
                (!businessName || product[6].toUpperCase() === businessName.toUpperCase()) && 
                (!productLocation || product[7].toUpperCase() === productLocation.toUpperCase()) && 
                (!productName || product[3].toUpperCase() === productName.toUpperCase()) && 
                (!category || product[2].toUpperCase() === category.toUpperCase()) 
            ); 
        });

        const data=filteredProducts.map((product: any) => ({
          'Product Reference': product[0],
          'Product Photo': product[1],
          'Product Category': product[2],
          'Product Name': product[3],
          'Product Description': product[4],
          'Product Price': product[5],
          'Business Name': product[6],
          'Business location': product[7],
          'Business Phone Number': product[8],
          'Business Till number': product[9],
          'Business Paybill': product[10],
          'Business paybill account number': product[11],
          'Business Location Photo': product[12],
          'Business Location lat_long': product[13]
        }))
        if(filteredProducts.length>0){
            return NextResponse.json(data);
        }else{
            const error= category
                ? `Cannot find a product under category ${category}`
                : productName?`Cannot find a product with name ${productName}` 
                : productLocation?`Cannot find a product under this location ${productLocation}`
                : `Cannot find a product by ${businessName}`
            return NextResponse.json({error},{ status : 404});
        }
    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}