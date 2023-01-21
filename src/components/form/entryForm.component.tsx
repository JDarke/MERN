import React, { useEffect, useState } from 'react';
import './entriesForm.style.css';
import * as API from '../../service/api.service';
import { Container, Form } from 'react-bootstrap';

const EntryForm = ({ entries }) => {
	const [formValues, setFormValues] = useState({
		title: '',
		text: '',
		date: '',
		time: ''
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	useEffect(() => {
		console.log('formValues', formValues);
	}, [formValues]);

	return (
		<Container className="mt-4">
			<h3 className="mb-3 text-center">Create new entry</h3>
			<Form className="me-5 w-50">
				
				<Form.Group className="mb-3 ms-4 d-flex" controlId="form.title">
					<Form.Label className="me-3 font-md">Title</Form.Label>
					<Form.Control
						size='sm'
						className="me-3"
						isInvalid={null}
						name="title"
						onChange={handleChange}
						value={formValues.title}
						type="text"
						placeholder=""
					/>
				</Form.Group>

				
			</Form>
		</Container>
	);
};

export default EntryForm;