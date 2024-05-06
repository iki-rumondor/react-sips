import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postData, useGetData } from "../../utils/Fetching";

export default function Edit({ uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [pembimbing, setPembimbing] = useState(null);
	const [values, setValues] = useState({
		nim: "",
		nama: "",
		angkatan: "",
		total_sks: "",
		ipk: "",
		jumlah_error: "",
		pembimbing_uuid: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("/api/mahasiswa/" + uuid, "PUT", values);
			toast.success(res?.message);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoad = async () => {
		try {
			const p_res = await fetchAPI("/api/pembimbing");
			setPembimbing(p_res.data);
			const res = await postData("/api/mahasiswa/" + uuid, "GET");
			setValues({
				nim: res.data.nim,
				nama: res.data.nama,
				angkatan: res.data.angkatan,
				total_sks: res.data.total_sks,
				ipk: res.data.ipk,
				jumlah_error: res.data.jumlah_error,
				pembimbing_uuid: res.data.pembimbing.uuid,
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

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
					<Modal.Title>Edit Data Mahasiswa</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit}>
					<Modal.Body>
						<Form.Group
							controlId="pembimbing_uuid"
							className="mb-3"
						>
							<Form.Label>Pembimbing Akademik</Form.Label>
							<Form.Control
								as="select"
								name="pembimbing_uuid"
								value={values.pembimbing_uuid}
								onChange={handleChange}
							>
								<option value="" disabled>
									Pilih PA
								</option>
								{pembimbing &&
									pembimbing.map((item, idx) => (
										<option key={idx} value={item.uuid}>
											{item.nama}
										</option>
									))}
							</Form.Control>
						</Form.Group>
						<Form.Group className="mb-3" controlId="nim">
							<Form.Label>Nim</Form.Label>
							<Form.Control
								name="nim"
								value={values?.nim}
								type="text"
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="nama">
							<Form.Label>Nama</Form.Label>
							<Form.Control
								name="nama"
								value={values?.nama}
								type="text"
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="angkatan">
							<Form.Label>Angkatan</Form.Label>
							<Form.Control
								name="angkatan"
								value={values?.angkatan}
								type="text"
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="ipk">
							<Form.Label>IPK</Form.Label>
							<Form.Control
								name="ipk"
								value={values?.ipk}
								type="text"
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="total_sks">
							<Form.Label>Total Sks</Form.Label>
							<Form.Control
								name="total_sks"
								value={values?.total_sks}
								type="text"
								onChange={handleChange}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Ubah
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}
