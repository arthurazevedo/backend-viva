const keyFilename = process.env.API_KEY;
const { Storage } = require('@google-cloud/storage');

const projectId = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET;

const gcs = new Storage({
  projectId,
  keyFilename,
});

const bucket = gcs.bucket(bucketName);

module.exports = bucket;
