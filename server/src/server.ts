import express from "express";
import cheerio from "cheerio";
import got from "got";

import UserData from "./config/dbModels";
import "./config/db";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/data", (req, res) => {
  const URL = req.body.link;
  let lowerBound = req.body.lowerBound;
  const email = req.body.email;

  let convertedPrice: number;

  got(URL)
    .then((response) => {
      const $ = cheerio.load(response.body);
      let price = $("#priceblock_ourprice").text().trim();

      for (let i = 0; i < price.length; i++) {
        if (price[i] === "," || price[i] === "₹") {
          continue;
        } else convertedPrice = convertedPrice + parseInt(price[i]);
      }

      lowerBound = parseFloat(lowerBound);

      const formInput = new UserData({
        link: URL,
        lowerBound,
        email,
      });

      formInput
        .save()
        .then(() => console.log("Saved to DataBase"))
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });

  res.send("Request Recorded...");
});

app.listen(port, () => {
  console.log("Server is up on port:" + port);
});
