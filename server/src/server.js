"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cheerio_1 = __importDefault(require("cheerio"));
var got_1 = __importDefault(require("got"));
var dbModels_1 = __importDefault(require("./config/dbModels"));
require("./config/db");
var app = express_1.default();
var port = process.env.PORT || 8000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.post("/api/data", function (req, res) {
    var URL = req.body.link;
    var lowerBound = req.body.lowerBound;
    var email = req.body.email;
    var convertedPrice;
    got_1.default(URL)
        .then(function (response) {
        var $ = cheerio_1.default.load(response.body);
        var price = $("#priceblock_ourprice").text().trim();
        for (var i = 0; i < price.length; i++) {
            if (price[i] === "," || price[i] === "₹") {
                continue;
            }
            else
                convertedPrice = convertedPrice + parseInt(price[i]);
        }
        lowerBound = parseFloat(lowerBound);
        var formInput = new dbModels_1.default({
            link: URL,
            lowerBound: lowerBound,
            email: email,
        });
        formInput
            .save()
            .then(function () { return console.log("Saved to DataBase"); })
            .catch(function (err) { return console.log(err); });
    })
        .catch(function (err) {
        console.log(err);
    });
    res.send("Request Recorded...");
});
app.listen(port, function () {
    console.log("Server is up on port:" + port);
});
