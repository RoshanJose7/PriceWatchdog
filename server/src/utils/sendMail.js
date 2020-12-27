"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function send_mail(email, URL) {
    var transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MYEMAIL,
            pass: process.env.PASSWORD,
        },
    });
    var mailOptions = {
        from: process.env.MYEMAIL,
        to: email,
        subject: " The Price Fell Down ",
        text: " Check the link now... \n " + URL,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        }
        else {
            return "Email sent: " + info.response;
        }
    });
}
exports.default = send_mail;
