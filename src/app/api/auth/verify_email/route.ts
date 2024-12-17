import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { writeDataToSheet, accessSheet } from "@/lib/google-apis/sheets";

const spreadsheetId = process.env.CUSTOMER_SPREADSHEET_ID as string;

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (email) {
            const code = createCode();
            const rows: any = await accessSheet(spreadsheetId, 'Sheet1!A1:J10');
            const emailExists = rows.some((row: any) => row.includes(email));

            if (emailExists) {
                return NextResponse.json({
                    error: "A user with this email already exists, try signing in",
                }, { status: 200 });
            } else {
                const mailTransporter = createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.TRANSPORTER,
                        pass: process.env.TRANSPORTER_PASSWORD
                    }
                });
                const details = {
                    from: process.env.TRANSPORTER,
                    to: email,
                    subject: `Verification Code`,
                    text: `Your villebiz One-Time Password (OTP) is \n${code}`
                };
                
                await new Promise<void>((resolve, reject) => {
                    mailTransporter.sendMail(details, (err: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                return NextResponse.json({
                    email,
                    code
                });
            }
        } else {
            return NextResponse.json({ error: "Please enter your email address" }, { status: 408 });
        }
    } catch (error: any) {
        console.error('Error:', error); // Return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function createCode(): string {
    const date = new Date();
    const hr = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const code = `${hr}${date.getFullYear()}`;
    return code;
}