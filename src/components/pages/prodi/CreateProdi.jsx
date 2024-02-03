import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function CreateProdi() {
	const {setIsLoading} = useLoading();
	const [show, setShow] = useState(false);
	const [jurusan, setJurusan] = useState(null);
	const [values, setValues] = useState({
		name: "",
		head: "",
		major_uuid: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const loadHandler = async () => {
		try {
			const res = await fetchData("majors");
			setJurusan(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const postHandler = async () => {
		handleClose()
		try {
			setIsLoading(true)
			const res = await postData("departments", "POST", values);
			toast.success(res.message)
		} catch (error) {
			toast.error(error.message);
		}finally{
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadHandler();
	}, []);

	return (
		<>
			<Button className="mb-3" variant="primary" onClick={handleShow}>
				Tambah Program Studi
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Program Studi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Nama Program Studi</Form.Label>
						<Form.Control
							value={values.name}
							type="text"
							placeholder="Masukkan Nama Program Studi"
							onChange={(e) =>
								setValues({
									...values,
									name: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="kaprodi">
						<Form.Label>Nama Ketua Program Studi</Form.Label>
						<Form.Control
							value={values.head}
							type="text"
							placeholder="Masukkan Nama Ketua Program Studi"
							onChange={(e) =>
								setValues({
									...values,
									head: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group controlId="jurusan">
						<Form.Label>Jurusan</Form.Label>
						<Form.Control
							value={values.major_uuid}
							as="select"
							onChange={(e) =>
								setValues({
									...values,
									major_uuid: e.target.value,
								})
							}
						>
							<option disabled value={""}>
								Pilih Jurusan
							</option>
							{jurusan &&
								jurusan.map((item, idx) => (
									<option value={item.uuid} key={idx}>
										{item.name}
									</option>
								))}
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={postHandler}>
						Tambah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
