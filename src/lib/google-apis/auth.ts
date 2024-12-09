import { google } from "googleapis";

const client = new google.auth.GoogleAuth({ 
    keyFile:`${process.env.KEY_FILE}`, 
    scopes: [ 'https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive' ], 
}); 

export async function authorize() { 
    const auth = await client.getClient(); 
    return auth; 
}