import { imageFilter } from "../helper/helper.js";
import { makePublic, uploadFile } from "../services/gcpStorage.js";
import multer from "multer";
import path from "path";

export const getPort = (req, res) => {
  res.send({ port: process.env.PORT }).status(200);
};

export const getPing = (req, res) => {
  res.send({ message: "pong" }).status(200);
};

const googleStorage = "https://storage.googleapis.com/";

// new direcories cannot be created in App Engine instance, so using /tmp to temporarily store uploaded images
const storage = multer.diskStorage({
  destination: "/tmp/images/",
  // By default, multer removes file extensions so need add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const postImage = (req, res) => {
  // 'file' is the key used for the form value to upload a file
  let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
  }).single("file");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    const bucketName = process.env.BUCKET_NAME;
    const uploadDir = process.env.UPLOAD_DIR;
    const destination = path.join(uploadDir, req.file.filename);

    // upload to gcp storage bucket
    uploadFile(req.file.path, destination)
      .then(() => {
        makePublic(destination)
          .then(() => {
            res.send({
              // url: "http://localhost:8000/" + req.file.path.replace("public/", ""),  // server static file on server
              url: googleStorage + path.join(bucketName, destination), // file url gcp storage
            });
          })
          .catch(console.error);
      })
      .catch(console.error);
  });
};
