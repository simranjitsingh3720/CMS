const dotenv = require("dotenv")
const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require("util")
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

 const generateUploadURL=async(req,res)=> {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 3600
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)

  res.status(200).json(uploadURL);
}

  export default generateUploadURL;