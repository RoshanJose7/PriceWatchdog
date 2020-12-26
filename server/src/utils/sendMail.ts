import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

function send_mail(email: string, URL: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MYEMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MYEMAIL,
    to: email,
    subject: " The Price Fell Down ",
    text: " Check the link now... \n " + URL,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      return "Email sent: " + info.response;
    }
  });
}

export default send_mail;
