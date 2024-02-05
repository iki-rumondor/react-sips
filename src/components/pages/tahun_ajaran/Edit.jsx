import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postData } from "../../utils/Fetching";

export default function Edit({ uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		tahun: "",
		semester: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		handleLoad()
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleLoad = async () => {
		try {
			const res = await fetchAPI("/api/tahun_ajaran/" + uuid);
			setValues(res.data);
		} catch (error) {
			toast.error(error);
		}
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("/api/tahun_ajaran/" + uuid, "PUT", values);
			toast.success(res.message);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
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
					<Modal.Title>Tambah Tahun Ajaran</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form.Group className="mb-3" controlId="tahun">
						<Form.Label>Tahun</Form.Label>
						<Form.Control
							name="tahun"
							value={values?.tahun}
							type="text"
							placeholder="Masukkan Tahun"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="semester">
						<Form.Label>Semester</Form.Label>
						<Form.Control
							name={"semester"}
							value={values?.semester}
							as="select"
							onChange={handleChange}
						>
							<option disabled value={""}>
								Pilih Semester
							</option>
							<option>Ganjil</option>
							<option>Genap</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Ubah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
