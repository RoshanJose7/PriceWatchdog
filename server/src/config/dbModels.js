"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    link: {
        type: String,
        required: true,
        trim: true,
    },
    lowerBound: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
});
var UserData = mongoose_1.model("MyUserData", UserSchema);
exports.default = UserData;
