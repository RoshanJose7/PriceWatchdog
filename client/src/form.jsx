import React, { useState } from 'react';

export default function Form() {
	const [data, setData] = useState({
		link: '',
		lowerBound: '',
		email: ''
	});

	function handleSubmit(e) {
		e.preventDefault();
		fetch('/api/data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => {
				console.log(res);
				res.status === 404 ? alert('Error Code ' + res.statusCode) : alert('Request Recorded' + res.statusCode);
			})
			.catch(err => console.log(err));
	}

	function handleChange(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	return (
		<div>
			<form onSubmit={e => handleSubmit(e)}>
				<input
					name='link'
					required
					placeholder='Link to amazon product'
					onChange={e => handleChange(e)}
					type='text'
				/>
				<input
					name='lowerBound'
					required
					placeholder='Lower Bound Price'
					onChange={e => handleChange(e)}
					type='text'
				/>
				<input name='email' required placeholder='your email' onChange={e => handleChange(e)} type='text' />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}
