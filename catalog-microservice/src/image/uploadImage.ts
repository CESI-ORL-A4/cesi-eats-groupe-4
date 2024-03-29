const fs = require('fs');
const AWS = require('aws-sdk');

// Enter copied or downloaded access id and secret here
const ID = 'AKIAWMVD42TFL2BAAOUU';
const SECRET = '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';

// Enter the name of the bucket that you have created here
const BUCKET_NAME = 'cesieats';


// Initializing S3 Interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

export const uploadImage = async (data: any, imageName: string):Promise<string> => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: imageName,
        Body: data,
        ACL: 'public-read',
    };
    const result = await s3.upload(params).promise();
    console.log(result);
    console.log(`File uploaded successfully at ${result.Location}`);
    return result.Location;
};
