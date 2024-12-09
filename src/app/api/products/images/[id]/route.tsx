import { downloadFileFromDrive } from "@/lib/google-apis/drive";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    try{
        const id = (await params).id
        const response:any= await downloadFileFromDrive(id)
        if (response) { 
            const { stream, mimeType, name } = response; 
            return new Response(stream, { 
                headers: { 
                    'Content-Type': mimeType, 
                    'Content-Disposition': `inline; filename="${name}"`, 
                }, 
            });
        } else { 
            return NextResponse.json({ error: 'No image found' }, { status: 404 }); 
        }
    }catch(error:any){
      console.error('Error:', error); // Return an error response
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}