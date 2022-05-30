import { Storage } from "@google-cloud/storage";

const gcpStorage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const uploadFile = async (filePath, destFileName) => {
  await gcpStorage.bucket(process.env.BUCKET_NAME).upload(filePath, {
    destination: destFileName,
  });
};

const makePublic = async (destFileName) => {
  await gcpStorage
    .bucket(process.env.BUCKET_NAME)
    .file(destFileName)
    .makePublic();
};

export { uploadFile, makePublic };
