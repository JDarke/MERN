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
		<Container className="mt-4 mb-5 d-flex flex-column align-items-center">
			<h3 className="mb-3 text-center">Create new entry</h3>
			<Form className="me-5 w-50">

				<Form.Group className="mb-3 ms-4 d-flex" controlId="form.title">
					<Form.Label className="me-3 mb-0">Title</Form.Label>
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

				<Form.Group className="mb-3 ms-4 d-flex" controlId="form.text">
					<Form.Label className="me-3 mb-0">Text</Form.Label>
					<Form.Control
						size='sm'
						className="me-3"
						isInvalid={null}
						name="title"
						onChange={handleChange}
						value={formValues.text}
						type="text"
						placeholder=""
					/>
				</Form.Group>

				<Form.Group className="mb-3 ms-4 d-flex" controlId="form.date">
					<Form.Label className="me-3 mb-0">Date</Form.Label>
					<Form.Control
						size='sm'
						className="me-3"
						isInvalid={null}
						name="title"
						onChange={handleChange}
						value={formValues.date}
						type="date"
						placeholder=""
					/>
				</Form.Group>
				<div className="d-flex flex-row">
					<Form.Group className="mb-3 ms-4 d-flex" controlId="form.time">
						<Form.Label className="me-3 mb-0">Time</Form.Label>
						<Form.Control
							size='sm'
							onChange={handleChange}
							isInvalid={null}
							value={formValues.time}
							as="select"
							name="time"
						>
							{[...Array(13).keys()].splice(1).map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>))}
						</Form.Control>
					</Form.Group>
					<div className="ms-2">:</div>
					<Form.Group className="mb-3 ms-2 d-flex" controlId="form.time">
						<Form.Control
							size='sm'
							onChange={handleChange}
							isInvalid={null}
							value={formValues.time}
							as="select"
							name="time"
						>
							{[...Array(60).keys()].map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>))}
						</Form.Control>
					</Form.Group>
					<Form.Group className="mb-3 ms-3 d-flex" controlId="form.time">
						<Form.Control
							size='sm'
							onChange={handleChange}
							isInvalid={null}
							value={formValues.time}
							as="select"
							name="time"
						>
							{['AM', 'PM'].map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>))}
						</Form.Control>
					</Form.Group>
				</div>
			</Form>
		</Container>
	);
};

export default EntryForm;