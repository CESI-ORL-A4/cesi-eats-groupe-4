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

export const uploadImage = (data:any, imageName:string):string => {
    const params = {
        Bucket: 'cesieats',
        Key: imageName,
        Body: JSON.stringify(data, null, 2),
        ACL: 'public-read',
    };
    s3.upload(params, function (s3Err: any, data: { Location: any; }) {
        if (s3Err)
            return "";
        console.log(`File uploaded successfully at ${data.Location}`);
        return data.Location;
    });
    return "";
};
