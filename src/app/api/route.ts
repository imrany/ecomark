import { GoogleGenerativeAI } from "@google/generative-ai";
import * as marked from "marked";
import { NextResponse } from "next/server";

const apiKey=process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try{
        const { prompt,email } = await req.json()
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text:any=marked.parse(response.text())

        const aiResponse: any = text.replace(/<[^>]+>/g, '');
        return Response.json({
          prompt,
          aiResponse
        })

    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}