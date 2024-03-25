import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { postData } from "../../utils/Fetching";

export default function Create() {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);

	const defaultValue = {
		user_uuid: sessionStorage.getItem("uuid"),
		nama: "",
		nip: "",
	};

	const [values, setValues] = useState(defaultValue);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData("/api/pembimbing", "POST", values);
			setIsSuccess(true);
			setValues(defaultValue);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Tambah Data PA
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Data</Modal.Title>
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
					<Form.Group className="mb-3" controlId="nip">
						<Form.Label>Nomor Induk Pegawai</Form.Label>
						<Form.Control
							name="nip"
							value={values?.nip}
							type="text"
							onChange={handleChange}
						/>
						<small>
							Akan Digunakan Sebagai Username dan Password Default
						</small>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Tambah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
