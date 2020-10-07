const UserData = require('./config/dbModels');
const express = require('express');
const app = express();
const cors = require('cors');
const cheerio = require('cheerio');
const got = require('got');
require('./config/db');

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/data', (req, res) => {
	const URL = req.body.link;
	let lowerBound = req.body.lowerBound;
	const email = req.body.email;
	headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0' };

	let convertedPrice = '';

	got(URL)
		.then(response => {
			const $ = cheerio.load(response.body);
			let price = $('#priceblock_ourprice').text().trim();

			for (let i = 0; i < price.length; i++) {
				if (price[i] === ',' || price[i] === '₹') {
					continue;
				} else convertedPrice = convertedPrice + price[i];
			}

			convertedPrice = parseFloat(convertedPrice);
			lowerBound = parseFloat(lowerBound);

			const formInput = new UserData({
				link: URL,
				lowerBound: lowerBound,
				email: email
			});

			formInput
				.save()
				.then(() => console.log('Saved to DataBase'))
				.catch(err => console.log(err));
		})
		.catch(err => {
			console.log(err);
		});

	res.send('Request Recorded...');
});

app.listen(port, () => {
	console.log('Server is up on port:' + port);
});
