require('./config/db');
const send_mail = require('./send_mail');
const got = require('got');
const cheerio = require('cheerio');
const UserData = require('./config/dbModels');

async function checkPrice() {
	const x = await UserData.find({});
	x.map(item => {
		got(item.link)
			.then(response => {
				const $ = cheerio.load(response.body);
				let price = $('#priceblock_ourprice').text();
				let convertedPrice = '';

				for (let i = 0; i < price.length; i++) {
					if (price[i] === ',' || price[i] === '₹') {
						continue;
					} else convertedPrice = convertedPrice + price[i];
				}

				convertedPrice < item.lowerBound ? send_mail(item.email, item.link) : console.log('Mail not sent');
			})
			.catch(err => {
				console.log(err);
			});
	});

	return x;
}

module.exports = checkPrice();
