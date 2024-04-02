import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { convertToMB } from "../../utils/Helpers";
import { fetchAPI, postFile } from "../../utils/Fetching";

export default function Import() {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [failed, setFailed] = useState(null);
	const [file, setFile] = useState(null);
	// const [pembimbingUuid, setPembimbingUuid] = useState("");
	// const [pembimbing, setPembimbing] = useState(null);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		// handleLoad();
		setShow(true);
	};

	const handleCloseFail = () => setShowFail(false);
	const handleShowFail = () => setShowFail(true);

	const handleFileChange = (e) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	// const handleLoad = async () => {
	// 	try {
	// 		const res = await fetchAPI(
	// 			"/api/pembimbing/prodi/" + sessionStorage.getItem("uuid")
	// 		);
	// 		setPembimbing(res.data);
	// 	} catch (error) {
	// 		toast.error(error?.message);
	// 	}
	// };

	const postHandler = async (e) => {
		e.preventDefault();
		handleClose();
		if (!file) {
			toast.error("Belum Ada File");
			return;
		}

		const formData = new FormData();
		formData.append("mahasiswa", file);

		try {
			setIsLoading(true);
			const res = await postFile(
				`/api/mahasiswa/import/${sessionStorage.getItem("uuid")}`,
				"POST",
				formData
			);
			setFailed(res.data);
			handleShowFail(true);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
			setFile(null);
		}
	};

	return (
		<>
			<Button className="ml-2" variant="success" onClick={handleShow}>
				Import Data Mahasiswa
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Import Data Mahasiswa</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* <Form.Group controlId="pembimbing" className="mb-3">
						<Form.Label>Pembimbing Akademik</Form.Label>
						<Form.Control
							as="select"
							value={pembimbingUuid}
							onChange={(e) => {
								setPembimbingUuid(e.target.value);
							}}
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
					</Form.Group> */}
					<Form.Group className="mb-3" controlId="code">
						<Form.Label>Pilih File</Form.Label>
						<Form.Control type="file" onChange={handleFileChange} />

						<small>File harus dalam format .xlsx</small>
						{file && (
							<>
								<div className="mt-3">File Detail: </div>
								<ul>
									<li>Nama File: {file.name}</li>
									<li>Tipe: {file.type}</li>
									<li>Ukuran: {convertToMB(file.size)}</li>
								</ul>
							</>
						)}
					</Form.Group>

					{/* <hr />
					<p>Silahkan Download Template Disini</p>
					<Button href="/public/template-import-mahasiswa.xlsx">Download</Button> */}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button onClick={postHandler}>Import</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showFail}
				onHide={handleCloseFail}
				backdrop="static"
				keyboard={false}
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>Response Import</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table className="table">
						<thead>
							<tr>
								<td>Nim</td>
								<td>Nama</td>
								<td>Pesan</td>
							</tr>
						</thead>
						<tbody>
							{failed &&
								failed.map((item, idx) => (
									<tr key={idx}>
										<td>{item.nim}</td>
										<td>{item.nama}</td>
										<td>{item.pesan}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseFail}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
