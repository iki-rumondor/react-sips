import React, { useState } from "react";
import useLoading from "../../hooks/useLoading";
import { Button, Dropdown, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchAPI, postData } from "../../utils/Fetching";
import { AddProdi } from "../forms/AddProdi";

export const UpdateDropdownModal = ({
	defaultValue,
	endpointLoad,
	endpointSubmit,
	title,
}) => {
	const { setIsSuccess, setIsLoading } = useLoading();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		handleLoad();
	};

	const [values, setValues] = useState(defaultValue);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(endpointLoad);
			setValues(res.data);
		} catch (error) {
			toast.error(error?.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData(endpointSubmit, "PUT", values);
			setIsSuccess(true);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dropdown.Item
				className="text-warning"
				href="#"
				onClick={handleShow}
			>
				Update
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddProdi handleChange={handleChange} values={values} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="warning" onClick={handleSubmit}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
