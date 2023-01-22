import React, { useEffect, useState } from 'react';
import './entriesForm.style.css';
import { Container, Form } from 'react-bootstrap';
import { IEntryBase } from '../../shared/interface';

// Create arrays of hours and minutes for time dropdowns
const hours = Array.from(Array(12).keys()).map((hour) => (hour + 1).toString());
const minutes = Array.from(Array(60).keys()).map((minute) => (minute < 10 ? `0${minute}` : minute.toString()));

const EntryForm = ({ addEntry, entry = null }) => {
	// Set initial values for form, use existing entry values if editing
	const [formValues, setFormValues] = useState({
		title: entry?.title || '',
		text: entry?.text || '',
		date: entry?.date || '',
		time: {
			hour: entry?.time?.split(':')[0] || '1',
			minute: entry?.time?.split(':')[1]?.split(' ')[0] || '00',
			type: entry?.time?.split(':')[1]?.split(' ')[1] || 'AM'
		}
	});
	const [initialValues, setInitialValues] = useState(formValues)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = event.currentTarget;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = event.currentTarget;
		setFormValues({ ...formValues, time: { ...formValues.time, [name]: value } });
	};

	const onSubmit = (): void => {
		const newEntryRequest: IEntryBase = {
			title: formValues.title,
			text: formValues.text,
			date: formValues.date,
			time: `${formValues.time.hour}:${formValues.time.minute} ${formValues.time.type}`
		};
		setFormValues({
			title: '',
			text: '',
			date: '',
			time: {
				hour: '1',
				minute: '00',
				type: 'AM'
			}
		});
		setInitialValues(formValues);
		addEntry(newEntryRequest);
	};

	// Check if form has changed from initial values when editing
	const formHasChanged = (): boolean => {
		return JSON.stringify(formValues) !== JSON.stringify(initialValues);
	}

	const formIsValid = (): boolean => {
		return formValues.title 
			&& formValues.text
			&& formValues.date
			&& formValues.time.hour
			&& formValues.time.minute
			&& formValues.time.type
			&& formHasChanged();
	};

	useEffect(() => {
		console.log('formValues', formValues);
	}, [formValues]);

	return (
		<Container className="mt-4 mb-5 d-flex flex-column align-items-center">
			{!entry && <h3 className="mb-3 text-center">Create new entry</h3>}
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
						name="text"
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
						name="date"
						onChange={handleChange}
						value={formValues.date}
						type="date"
						placeholder=""
					/>
				</Form.Group>

				<div className="d-flex flex-row">
					<Form.Group className="mb-3 ms-4 d-flex" controlId="form.time.hour">
						<Form.Label className="me-3 mb-0">Time</Form.Label>
						<Form.Control
							size='sm'
							onChange={handleTimeChange}
							isInvalid={null}
							value={formValues.time.hour}
							as="select"
							name="hour"
						>
							{hours.map((item, index) => (
								<option key={index} value={item.toString()}>
									{item}
								</option>))}
						</Form.Control>
					</Form.Group>
					<div className="ms-2">:</div>
					<Form.Group className="mb-3 ms-2 d-flex" controlId="form.time.minute">
						<Form.Control
							size='sm'
							onChange={handleTimeChange}
							isInvalid={null}
							value={formValues.time.minute}
							as="select"
							name="minute"
						>
							{minutes.map((item, index) => (
									<option key={index} value={item}>
										{item}
									</option>
								))}
						</Form.Control>
					</Form.Group>
					<Form.Group className="mb-3 ms-3 d-flex" controlId="form.time.type">
						<Form.Control
							size='sm'
							onChange={handleTimeChange}
							isInvalid={null}
							value={formValues.time.type}
							as="select"
							name="type"
						>
							{['AM', 'PM'].map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>))}
						</Form.Control>
					</Form.Group>
				</div>
				
			</Form>
			<button onClick={onSubmit} disabled={!formIsValid()} className="btn btn-primary">Submit</button>
		</Container>
	);
};

export default EntryForm;