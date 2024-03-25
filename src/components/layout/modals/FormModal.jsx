import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const FormModal = ({ title, className, formElement, handleSubmit }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button
				className={className}
				variant="primary"
				onClick={handleShow}
			>
				{title}
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{formElement}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							handleClose();
							handleSubmit();
						}}
					>
						Konfirmasi
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
