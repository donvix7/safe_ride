import cloudinary from "./cloudinary";

export async function UploadImage(file) { // Removed the unused `string` parameter

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
       
        cloudinary.uploader.upload_stream({

            resource_type: "auto",
            folder: "image-upload" // Define the folder name here

        }, (error, result) => { // Removed 'async' from the callback as it's not necessary
            if (error) {
               return reject(error);
            } else {
               return resolve(result);
            }
        }).end(bytes);
    });
}
