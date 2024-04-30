import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import { fetchAPI, postData } from "../../../utils/Fetching";

export const UpdateUsername = ({ uuid }) => {
	const { setIsSuccess, setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		username: "",
	});

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		handleLoad();
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/user/${uuid}`);
			setValues({ username: res.data.username });
		} catch (error) {
			toast.error(error?.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData(
				`/api/user/${uuid}/username`,
				"PATCH",
				values
			);
			setIsSuccess(true);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dropdown.Item className="text-warning" href="#" onClick={handleShow}>
				Ubah Username
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Ubah Username</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							name="username"
							value={values?.username}
							type="text"
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
