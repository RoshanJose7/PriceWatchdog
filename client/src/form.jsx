import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function MyForm() {
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
		<Form onSubmit={e => handleSubmit(e)}>
			<Form.Group name='link' required onChange={e => handleChange(e)} controlId='exampleForm.ControlInput1'>
				<Form.Label>The Direct Link to the Product</Form.Label>
				<Form.Control type='text' placeholder='https://amazon.in/<your product>' />
			</Form.Group>
			<Form.Group name='link' required onChange={e => handleChange(e)} controlId='exampleForm.ControlInput1'>
				<Form.Label>The Lowest price which you want to be notifed at...</Form.Label>
				<Form.Control type='text' placeholder='5000' />
			</Form.Group>
			<Form.Group name='link' required onChange={e => handleChange(e)} controlId='exampleForm.ControlInput1'>
				<Form.Label>Email address</Form.Label>
				<Form.Control type='email' placeholder='name@example.com' />
			</Form.Group>
			<Button variant='danger' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
