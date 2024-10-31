const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

require("./config/database").connect();
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const routes = require("./router/router");
app.use("/api/v1/upload", routes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
