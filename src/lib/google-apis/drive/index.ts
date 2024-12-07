import { google } from 'googleapis';
import axios from "axios";
import fs from 'fs';
import { authorize } from '../auth';

// Google Drive setup
const google1:any=google
const auth = await authorize();
const drive:any = google1.drive({
  version: 'v3',
  auth
});

export async function uploadImageToDrive() {
    try {
        const fileMetadata = {
            name: 'uploaded-image.jpg',
            parents: ['1j8HoUCSZKvY6jg03QMO-cVs9tCfuZrcj'] // Optional: specify a folder ID
        };
        const media = {
            mimeType: 'image/jpeg',
            body: fs.createReadStream('path/to/your/image.jpg') // Replace with your image file path
        };
        const response:any = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });
        console.log('File ID:', response.data.id);
    } catch (error) {
        console.error('Error uploading to Google Drive:', error);
    }
}