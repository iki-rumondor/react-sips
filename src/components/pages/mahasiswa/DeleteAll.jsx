import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { convertToMB } from "../../utils/Helpers";
import { deleteAPI, fetchAPI, postFile } from "../../utils/Fetching";

export default function DeleteAll() {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = async () => {
		try {
			handleClose();
			setIsSuccess(false)
			setIsLoading(true);
			const res = await deleteAPI(
				"/api/mahasiswa/prodi/" + sessionStorage.getItem("uuid")
			);
			setIsSuccess(true)
			toast.success(res?.message);
		} catch (error) {
			toast.error(error?.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button className="ml-2" variant="danger" onClick={handleShow}>
				Hapus Semua
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Hapus Semua Data Mahasiswa</Modal.Title>
				</Modal.Header>
				<Modal.Body>Tekan Hapus Semua Untuk Melanjutkan</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant={"danger"} onClick={handleSubmit}>
						Hapus Semua
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
