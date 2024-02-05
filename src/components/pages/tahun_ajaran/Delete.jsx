import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { deleteAPI } from "../../utils/Fetching";

export default function Delete({ uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDelete = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await deleteAPI("/api/tahun_ajaran/" + uuid);
			toast.success(res?.message);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dropdown.Item
				className="text-danger"
				href="#"
				onClick={handleShow}
			>
				Hapus
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Hapus Tahun Ajaran</Modal.Title>
				</Modal.Header>
				<Modal.Body>Tekan Hapus Untuk Melanjutkan</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						Hapus
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
