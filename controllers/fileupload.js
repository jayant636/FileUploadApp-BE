const { json } = require("express");
const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    // you must create a files folder inside controller
    // and pass file in key in postman formdata
    const file = req.files.file;
    console.log("File data", file);

    // path where file needs to be stored on server
    // __dirname gives name of current directory
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log(path);

    // add path to mv function
    file.mv(path, (err) => {
      console.log(err);
    });

    // create a successfully response
    res.json({
      success: true,
      message: "LOcal file uploaded successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

function isfileSupported(type, supportedtypes) {
  return supportedtypes.includes(type);
}

async function uploadfiletoCloudinary(file, folder, quality) {
  const options = folder;
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath);
}

exports.imageUpload = async (req, res) => {
  try {
    // fetch data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedtypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // if format doesn't support
    if (!isfileSupported(fileType, supportedtypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // For uploading the file on cloudinary
    const response = await uploadfiletoCloudinary(file, "codehelp");

    // save entry into db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    // fetch data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log(file);

    //validation
    const supportedtypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // if format doesn't support
    if (!isfileSupported(fileType, supportedtypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // For uploading the file on cloudinary
    const response = await uploadfiletoCloudinary(file, "codehelp");

    // save entry into db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
    });
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.status(404),
      json({
        success: false,
        message: "Error uploading video",
      });
  }
};

exports.imagesizereducer = async (req, res) => {
  try {
    // fetch data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedtypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // if format doesn't support
    if (!isfileSupported(fileType, supportedtypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // For uploading the file on cloudinary
    const response = await uploadfiletoCloudinary(file, "codehelp", 10);

    // save entry into db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};
