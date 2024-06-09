const admin = require("firebase-admin");
const serviceAccount = require("./credentials");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://courses-f9468.appspot.com",
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = {
  bucket,
  uploadFileToFirebase: (file, fileName) => {
    return new Promise((resolve, reject) => {
      const fileUpload = bucket.file(fileName);
      const blobStream = fileUpload.createWriteStream();

      blobStream.on("finish", () => {
        const imageurl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(fileUpload.name)}?alt=media`;
        resolve(imageurl);
      });

      blobStream.on("error", (error) => {
        reject(error);
      });

      blobStream.end(file.buffer);
    });
  },
};
