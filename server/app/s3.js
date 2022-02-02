
const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require("util")
const randomBytes = promisify(crypto.randomBytes)

const region = "us-east-1"
const bucketName = "my-first-aws-bucket-creation"
const accessKeyId = 'AKIASXF74XJXHJZEHSPH'
const secretAccessKey = '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'

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

 async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 3600
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)

  return uploadURL
}

  module.exports.generateUploadURL=generateUploadURL;