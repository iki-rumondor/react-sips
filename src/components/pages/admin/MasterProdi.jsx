import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Button, Card, CardBody, Dropdown, Table } from "react-bootstrap";
import { fetchAPI, postData } from "../../utils/Fetching";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { FormModal } from "../../layout/modals/FormModal";
import { AddProdi } from "../../layout/forms/AddProdi";
import { DeleteDropdownModal } from "../../layout/modals/DeleteDropdownModal";
import { UpdateDropdownModal } from "../../layout/modals/UpdateDropdownModal";

export const MasterProdi = () => {
	const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
	const [prodi, setProdi] = useState(null);
	const defaultValue = {
		name: "",
		kaprodi: "",
		username: "",
	};

	const [values, setValues] = useState(defaultValue);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/prodi");
			setProdi(res.data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCreate = async () => {
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData("/api/prodi", "POST", values);
			setIsSuccess(true);
			setValues(defaultValue);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout header={"Manajemen Program Studi"}>
				<FormModal
					formElement={
						<AddProdi handleChange={handleChange} values={values} />
					}
					className="mb-3"
					title={"Tambah Program Studi"}
					handleSubmit={handleCreate}
				/>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Nama</th>
									<th>Nama Kooridinator Program Studi</th>
									<th>Username</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{prodi &&
									prodi.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.name}</td>
											<td>{item.kaprodi}</td>
											<td>{item.username}</td>
											<td>
												<Dropdown>
													<Dropdown.Toggle
														className="btn-sm"
														variant="danger"
														id="dropdown-basic"
													>
														Pilih
													</Dropdown.Toggle>

													<Dropdown.Menu>
														<UpdateDropdownModal
															endpointLoad={`/api/prodi/${item.uuid}`}
															endpointSubmit={`/api/prodi/${item.uuid}`}
															defaultValue={
																defaultValue
															}
															title={
																"Update Program Studi"
															}
														/>
														<DeleteDropdownModal
															endpoint={`/api/prodi/${item.uuid}`}
														/>
													</Dropdown.Menu>
												</Dropdown>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</DashboardLayout>
		</>
	);
};
