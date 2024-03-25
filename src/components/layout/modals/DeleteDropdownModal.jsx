import React, { useState } from "react";
import useLoading from "../../hooks/useLoading";
import { Button, Dropdown, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { deleteAPI } from "../../utils/Fetching";

export const DeleteDropdownModal = ({endpoint}) => {
	const { setIsSuccess, setIsLoading } = useLoading();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDelete = async () => {
		handleClose();
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await deleteAPI(endpoint);
			setIsSuccess(true);
			toast.success(res?.message);
		} catch (error) {
			toast.error(error?.message);
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
					<Modal.Title>Hapus Data</Modal.Title>
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
};
