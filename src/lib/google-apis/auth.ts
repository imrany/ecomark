import { google } from "googleapis";
import path from "path"
// import fs from "fs"
import { fileURLToPath } from 'url'
    
const __filename = fileURLToPath(import.meta.url)

const __dirnameNew = path.dirname(__filename)

const keyFile = path.join(__dirnameNew,"key/villebiz-7d68d9a6ebb9.json")
const client = new google.auth.GoogleAuth({ 
    keyFile, 
    scopes: [ 'https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file' ], 
}); 

export async function authorize() { 
    const auth = await client.getClient(); 
    return auth; 
}