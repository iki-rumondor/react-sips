import React from "react";
import { Form } from "react-bootstrap";

export const AddKajurForm = ({ values, handleChange }) => {
	return (
		<>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Username</Form.Label>
				<Form.Control
					name="username"
					value={values?.username}
					type="text"
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control
					name="password"
					value={values?.password}
					type="password"
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="confirm_password">
				<Form.Label>Konfirmasi Password</Form.Label>
				<Form.Control
					name="confirm_password"
					value={values?.confirm_password}
					type="password"
					onChange={handleChange}
				/>
			</Form.Group>
		</>
	);
};
