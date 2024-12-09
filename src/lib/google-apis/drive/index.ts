import { google } from 'googleapis';
import formidable from "formidable"
import fs from 'fs';
import { authorize } from '../auth';

// Google Drive setup
const google1:any=google
const storageFolderId=`${process.env.STORAGE_FOLDER_ID}`

export async function uploadFileToDrive(req:any) { 
    return new Promise(async(resolve, reject) => { 
        const auth = await authorize(); 
        const drive:any = google1.drive({version: 'v3',auth});
        
        try {
            var form =formidable({
                keepExtensions:true,
                maxFileSize:10 * 1024 * 1024 //10mbs
            });
            form.parse(req)
            form.on('file',async(name:any, files:any) => {
                const fileMetadata = {
                    name: files.originalFilename,
                    parents: [storageFolderId],
                };
                const media = {
                    mimeType: files.mimetype,
                    body: fs.createReadStream(files.filepath),
                };

                const response:any = await drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                });
                console.log('File ID:', response.data.id);
                resolve(response.data.id)
            })
        } catch (error) {
            console.error('Error uploading to Google Drive:', error);
            reject(error)
        }
    })
}

export async function downloadFileFromDrive(fileId:string) { 
    return new Promise(async(resolve, reject) => { 
        const auth = await authorize(); 
        const drive:any = google1.drive({version: 'v3',auth});

        try{
            // Get file metadata 
            const metadataResponse = await drive.files.get({ fileId: fileId, fields: 'id, name, mimeType', }); 
            const { mimeType, name } = metadataResponse.data; 
            // Download the image
            await drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
                function (error:any, response:any) {
                  if(error){
                    console.log(error.message)
                    reject(error)
                  }
                  resolve({ stream: response.data, mimeType, name })
                }
            );
        }catch(error){
            reject(error)
        }
    })
}


export async function deleteFileFromDrive(fileId:string) { 
    return new Promise(async(resolve, reject) => { 
        const auth = await authorize(); 
        const drive:any = google1.drive({version: 'v3',auth});

        try{
            const response=await drive.files.delete({ 'fileId': fileId })
            resolve(response.data.id)
        }catch(error){
            reject(error)
        }
    })
}

export async function createDriveFolder(folderName:string) { 
    return new Promise(async(resolve, reject) => { 
        const auth = await authorize(); 
        const drive:any = google1.drive({version: 'v3',auth});

        try{
            const fileMetadata = {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
            };
            const response = await drive.files.create({
                resource: fileMetadata,
                fields: 'id',
            });
            console.log('Folder Id:', response.data.id);
            await drive.permissions.create({
              'fileId':response.data.id,
              requestBody:{
                role:"reader",
                type:"anyone"
              }
            })
            resolve(response.data.id)
        }catch(error){
            reject(error)
        }
    })
}

export async function renameDriveFolder(folderNewName:string,folderId:string) { 
    return new Promise(async(resolve, reject) => { 
        const auth = await authorize(); 
        const drive:any = google1.drive({version: 'v3',auth});

        try{
            const fileMetadata = {
                name: folderNewName,
            };
            const response=await drive.files.update({ 
                resource: fileMetadata,
                "fileId":folderId,
                fields: "id",
            })
            resolve(response.data.id)
        }catch(error){
            reject(error)
        }
    })
}

export async function deleteDriveFolder(folderId:string) { 
    return new Promise(async(resolve, reject) => { 
        const auth = await authorize(); 
        const drive:any = google1.drive({version: 'v3',auth});

        try{
            const response=await drive.files.delete({ 
                "fileId":folderId,
                fields: "id",
            })
            resolve(response.data.id)
        }catch(error){
            reject(error)
        }
    })
}