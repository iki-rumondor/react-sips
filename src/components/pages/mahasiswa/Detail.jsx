import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { ListKeyValue } from "../../module/List";
import useLoading from "../../hooks/useLoading";
import { postData } from "../../utils/Fetching";

export default function Detail({ uuid }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		handleLoad();
	};

	const [values, setValues] = useState([]);

	const handleLoad = async () => {
		try {
			const res = await postData("/api/mahasiswa/" + uuid, "GET");
			setValues(res.data);
		} catch (error) {
			toast.error(error?.message);
		}
	};

	return (
		<>
			<Dropdown.Item className="text-info" href="#" onClick={handleShow}>
				Detail
			</Dropdown.Item>

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
							<ListKeyValue
								keys={"Jumlah Error"}
								value={values?.jumlah_error}
							/>
							<ListKeyValue
								keys={"Kelas"}
								value={values?.kelas == "" ? "-" : values.kelas}
							/>
							<ListKeyValue
								keys={"Percepatan"}
								value={
									values?.percepatan ? "Masuk" : "Tidak Masuk"
								}
							/>
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
