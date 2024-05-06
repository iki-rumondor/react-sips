import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { ListKeyValue } from "../../module/List";
import { fetchAPI } from "../../utils/Fetching";

export default function DetailMahasiswa({ uuid }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		handleLoad();
	};

	const [values, setValues] = useState([]);

	const handleLoad = async () => {
		try {
			const res = await fetchAPI("/api/mahasiswa/" + uuid);
			setValues(res.data);
		} catch (error) {
			toast.error(error?.message);
		}
	};

	return (
		<>
			<Button variant="info" href="#" onClick={handleShow}>
				Detail
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Detail Mahasiswa</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{values && (
						<>
							<ListKeyValue
								keys={"Pembimbing Akademik"}
								value={values?.pembimbing?.nama}
							/>
							<ListKeyValue keys={"NIM"} value={values?.nim} />
							<ListKeyValue
								keys={"Nama Mahasiswa"}
								value={values?.nama}
							/>
							<ListKeyValue
								keys={"Angkatan"}
								value={values?.angkatan}
							/>
							<ListKeyValue
								keys={"Total SKS"}
								value={values?.total_sks}
							/>
							<ListKeyValue keys={"IPK"} value={values?.ipk} />
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
