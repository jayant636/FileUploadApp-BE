const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// Transporter
fileSchema.post("save", async function (doc) {
  try {
    console.log(doc);

    // transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // mail send
    let info = await transporter.sendMail({
      from: "Codehelp",
      to: doc.email,
      subject: "New file upload on cloudinary",
      html: `<h2>Profile uploaded</h2>`,
    });

    console.log("Info", info);
  } catch (e) {
    console.error(e);
  }
});

// New way to export
const file = mongoose.model("File", fileSchema);
module.exports = file;
