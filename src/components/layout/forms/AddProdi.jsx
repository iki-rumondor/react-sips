import React from "react";
import { Form } from "react-bootstrap";

export const AddProdi = ({ values, handleChange }) => {
	return (
		<>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Nama Program Studi</Form.Label>
				<Form.Control
					name="name"
					value={values?.name}
					type="text"
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="kaprodi">
				<Form.Label>Nama Koordinator Prodi</Form.Label>
				<Form.Control
					name="kaprodi"
					value={values?.kaprodi}
					type="text"
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Username</Form.Label>
				<Form.Control
					name="username"
					value={values?.username}
					type="text"
					onChange={handleChange}
				/>
			</Form.Group>
		</>
	);
};
