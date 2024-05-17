import React, { useEffect, useState } from "react";
import { fetchAPI, postData } from "../../utils/Fetching";
import toast from "react-hot-toast";
import DashboardLayout from "../DashboardLayout";
import { Button, Card, CardBody, Form, Modal, Table } from "react-bootstrap";
import DetailMahasiswa from "./DetailMahasiswa";
import useLoading from "../../hooks/useLoading";
import { filterMahasiswa } from "../../utils/Helpers";

export const PotensiDo = () => {
	const dummy = [
		{
			uuid: "uuid",
			nama: "Masita Manangin",
			nim: "531420081",
			angkatan: 2020,
		},
	];

	const pesan = [
		"Segera Menghadap Ke Dosen PA",
		"Selesaikan Masalah Mata Kuliah",
		"Lain-lain",
	];

	const defaultValue = {
		uuid: "",
		status: "",
		message: "",
	};

	const [values, setValues] = useState(defaultValue);
	const [customMessage, setCustomMessage] = useState("");

	const { setIsLoading, isSuccess, setIsSuccess } = useLoading();
	const [mahasiswa, setMahasiswa] = useState(null);
	const [selectedUuid, setSelectedUuid] = useState("");
	const [open, setOpen] = useState(false);

	const handleOpen = (value) => {
		setOpen(!open);
		setSelectedUuid(value);
	};

	const handleLoad = async () => {
		try {
			const res = await fetchAPI(
				`/api/mahasiswa/potensial-do/${sessionStorage.getItem("uuid")}`
			);
			setMahasiswa(filterMahasiswa("potensial_do", res.data));
		} catch (error) {
			toast.error(error?.message);
		}
	};

	const handlePeringatan = async () => {
		const data = {
			mahasiswa_uuid: selectedUuid,
			pembimbing_uuid: sessionStorage.getItem("uuid"),
			status: 1,
			message:
				values.message !== "Lain-lain" ? values.message : customMessage,
		};

		try {
			setOpen(!open);
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData(`/api/message`, "POST", data);
			setIsSuccess(true);
			toast.success(res?.message);
			setValues(defaultValue);
		} catch (error) {
			toast.error(error?.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout header={"Mahasiswa Berpotensi Drop Out"}>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Nim</th>
									<th>Nama</th>
									<th>Angkatan</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{mahasiswa &&
									mahasiswa.map((item, idx) => {
										return (
											<tr key={idx}>
												<td>{idx + 1}</td>
												<td>{item.nim}</td>
												<td>{item.nama}</td>
												<td>{item.angkatan}</td>
												<td>
													<Button
														className="mr-1 btn-sm"
														variant="danger"
														onClick={() =>
															handleOpen(
																item.uuid
															)
														}
													>
														Peringatan
													</Button>
													<DetailMahasiswa
														uuid={item.uuid}
													/>
												</td>
											</tr>
										);
									})}
							</tbody>
						</Table>
					</CardBody>
				</Card>
				<Modal
					show={open}
					onHide={() => setOpen(!open)}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Peringatan Mahasiswa</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div>
							Pilih Pesan Peringatan Yang Ingin Disampaikan Ke
							Mahasiswa
						</div>
						<Form.Group controlId="pesan" className="mb-3">
							<Form.Label>Pesan</Form.Label>
							<Form.Control
								as="select"
								value={values.message}
								onChange={(e) =>
									setValues({
										...values,
										message: e.target.value,
									})
								}
							>
								<option value="" disabled>
									Pilih Pesan
								</option>
								{pesan.map((item) => (
									<option>{item}</option>
								))}
							</Form.Control>
						</Form.Group>
						{values.message == "Lain-lain" && (
							<Form.Group
								controlId="customMassage"
								className="mb-3"
							>
								<Form.Label>Masukkan Pesan</Form.Label>
								<Form.Control
									value={customMessage}
									as={"textarea"}
									rows={3}
									onChange={(e) =>
										setCustomMessage(e.target.value)
									}
								/>
							</Form.Group>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="success" onClick={handlePeringatan}>
							Setuju
						</Button>
						<Button
							variant="secondary"
							onClick={() => setOpen(!open)}
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</DashboardLayout>
		</>
	);
};
