import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Button, Card, CardBody, Form, Modal, Table } from "react-bootstrap";
import { generateYearArray } from "../../utils/Helpers";
import { fetchAPI, postData } from "../../utils/Fetching";
import toast from "react-hot-toast";

export default function Percepatan() {
	const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [mahasiswa, setMahasiswa] = useState(null);
	const [values, setValues] = useState({
		angkatan: "",
		total_sks: "",
		ipk: "",
		jumlah_error: "",
	});

	const years = generateYearArray();

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/percepatan");
			setMahasiswa(res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postData("/api/percepatan", "POST", values);
			toast.success(res.message);
			setIsSuccess(true);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout header={"Mahasiswa Percepatan Studi"}>
				<Button className="mb-3" onClick={handleShow}>
					Set Mahasiswa Percepatan
				</Button>
				{mahasiswa && (
					<Card>
						<CardBody>
							<Table className="table-bordered">
								<thead>
									<tr>
										<th>No</th>
										<th>NIM</th>
										<th>Nama Mahasiswa</th>
									</tr>
								</thead>
								<tbody>
									{mahasiswa.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.nim}</td>
											<td>{item.nama}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</CardBody>
					</Card>
				)}

				{show && (
					<Card>
						<Modal
							show={show}
							onHide={handleClose}
							backdrop="static"
							keyboard={false}
						>
							<Modal.Header closeButton>
								<Modal.Title>Tentukan Aturan</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form.Group
									className="mb-3"
									controlId="angkatan"
								>
									<Form.Label>Angkatan</Form.Label>
									<Form.Control
										name={"angkatan"}
										value={values?.angkatan}
										as="select"
										onChange={handleChange}
									>
										<option disabled value={""}>
											Pilih Angkatan
										</option>
										{years.map((item, idx) => (
											<option key={idx}>{item}</option>
										))}
									</Form.Control>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="total_sks"
								>
									<Form.Label>Minimal Total Sks</Form.Label>
									<Form.Control
										name="total_sks"
										value={values?.total_sks}
										type="number"
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="jumlah_error"
								>
									<Form.Label>
										Minimal Jumlah Error
									</Form.Label>
									<Form.Control
										name="jumlah_error"
										value={values?.jumlah_error}
										type="number"
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="ipk">
									<Form.Label>Minimal IPK</Form.Label>
									<Form.Control
										name="ipk"
										value={values?.ipk}
										type="number"
										onChange={handleChange}
									/>
									<small>Contoh: 3 Atau 3.25</small>
								</Form.Group>
							</Modal.Body>
							<Modal.Footer>
								<Button
									variant="secondary"
									onClick={handleClose}
								>
									Close
								</Button>
								<Button
									variant="primary"
									onClick={handleSubmit}
								>
									Tambah
								</Button>
							</Modal.Footer>
						</Modal>
					</Card>
				)}
			</DashboardLayout>
		</>
	);
}
