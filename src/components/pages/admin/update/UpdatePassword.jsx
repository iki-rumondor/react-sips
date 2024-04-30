import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import { postData } from "../../../utils/Fetching";

export const UpdatePassword = ({ uuid }) => {
	const { setIsSuccess, setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		current_password: "",
		new_password: "",
		confirm_password: "",
	});

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData(
				`/api/user/${uuid}/password`,
				"PATCH",
				values
			);
			setIsSuccess(true);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
			setValues({
				current_password: "",
				new_password: "",
				confirm_password: "",
			});
		}
	};

	return (
		<>
			<Dropdown.Item
				className="text-warning"
				href="#"
				onClick={handleShow}
			>
				Ubah Password
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Ubah Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="current_password">
						<Form.Label>Password Lama</Form.Label>
						<Form.Control
							name="current_password"
							value={values?.current_password}
							type="password"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="new_password">
						<Form.Label>Password Baru</Form.Label>
						<Form.Control
							name="new_password"
							value={values?.new_password}
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
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="warning" onClick={handleSubmit}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
