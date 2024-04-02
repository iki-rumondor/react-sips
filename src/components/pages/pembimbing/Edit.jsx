import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postData, useGetData } from "../../utils/Fetching";

export default function Edit({ uuid }) {
	const { setIsSuccess, setIsLoading } = useLoading();
	const [show, setShow] = useState(false);

	const defaultValue = {
		nama: "",
		// nip: "",
	};

	const [values, setValues] = useState(defaultValue);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		handleLoad();
		setShow(true);
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData(
				"/api/pembimbing/" + uuid,
				"PUT",
				values
			);
			setIsSuccess(true);
			toast.success(res?.message);
		} catch (error) {
			toast.error(error?.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoad = async () => {
		try {
			const res = await fetchAPI("/api/pembimbing/" + uuid);
			setValues(res.data);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<>
			<Dropdown.Item
				className="text-warning"
				href="#"
				onClick={handleShow}
			>
				Edit
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Update Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="nama">
						<Form.Label>Nama</Form.Label>
						<Form.Control
							name="nama"
							value={values?.nama}
							type="text"
							onChange={handleChange}
						/>
					</Form.Group>
					{/* <Form.Group className="mb-3" controlId="nip">
						<Form.Label>Nomor Induk Pegawai</Form.Label>
						<Form.Control
							name="nip"
							value={values?.nip}
							type="text"
							onChange={handleChange}
						/>
					</Form.Group> */}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
