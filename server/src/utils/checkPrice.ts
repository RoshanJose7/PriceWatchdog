import got from "got";
import cheerio from "cheerio";

import sendMail from "./sendMail";
import UserData from "../config/dbModels";
import "../config/db";

async function checkPrice() {
  const x = await UserData.find({});
  x.map((item) => {
    got(item.link)
      .then((response) => {
        const $ = cheerio.load(response.body);
        let price = $("#priceblock_ourprice").text();
        let convertedPrice: number;

        for (let i = 0; i < price.length; i++) {
          if (price[i] === "," || price[i] === "₹") {
            continue;
          } else convertedPrice = convertedPrice + parseInt(price[i]);
        }

        convertedPrice < item.lowerBound
          ? sendMail(item.email, item.link)
          : console.log("Mail not sent");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return x;
}

export default checkPrice;
