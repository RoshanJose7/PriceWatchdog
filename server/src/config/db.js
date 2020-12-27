"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var URI = "mongodb+srv://dbUser:dbUserPassword@userdata.dmwm7.mongodb.net/dbUser?retryWrites=true&w=majority";
mongoose_1.default
    .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(function () { return console.log("Database Connected..."); })
    .catch(function (err) { return console.log(err); });
exports.db = mongoose_1.default.connection;
