const credentials = require('./s3_credentials');
const s3 = require('s3');
const config = require('./config');

console.log(credentials.aws_access_key_id);
if (!credentials.aws_access_key_id || !credentials.aws_secret_access_key) {
  throw Error('Please set up S3 credentials');
}

const client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: credentials.aws_access_key_id,
    secretAccessKey: credentials.aws_secret_access_key,
    endpoint: config.endpoint
  }
});

const params = {
  localDir: config.buildDir,

  s3Params: {
    Bucket: config.bucket,
    ACL: 'public-read'
  }
};

const uploader = client.uploadDir(params);

uploader.on('error', function (err) {
  throw Error('unable to sync:' + err.stack);
});

uploader.on('progress', function () {
  console.log('progress', uploader.progressAmount, uploader.progressTotal);
});

uploader.on('end', function () {
  console.log('done uploading');
});
