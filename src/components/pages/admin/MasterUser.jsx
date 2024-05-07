import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Card, CardBody, Dropdown, Form, Table } from "react-bootstrap";
import { fetchAPI, postData } from "../../utils/Fetching";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { FormModal } from "../../layout/modals/FormModal";
import { filterHasKajur, searchPengguna, sortJSON } from "../../utils/Helpers";
import { AddKajurForm } from "../../layout/forms/AddKajurForm";
import { UpdateForm } from "../../layout/modals/UpdateForm";
import { UpdateUsername } from "./update/UpdateUsername";
import { UpdatePassword } from "./update/UpdatePassword";

export const MasterUser = () => {
	const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
	const [users, setUser] = useState(null);
	const [hasKajur, setHasKajur] = useState(false);
	const [keyword, setKeyword] = useState("");

	const defaultValue = {
		username: "",
		password: "",
		confirm_password: "",
		role_id: 1,
	};
	const [values, setValues] = useState(defaultValue);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/users");
			setUser(sortJSON(res?.data, "role", "asc"));
			setHasKajur(filterHasKajur(res?.data));
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
			const res = await postData("/api/kajur", "POST", values);
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
			<DashboardLayout header={"Manajemen User"}>
				{!hasKajur && (
					<FormModal
						formElement={
							<AddKajurForm
								handleChange={handleChange}
								values={values}
							/>
						}
						className="mb-3"
						title={"Tambah Ketua Jurusan"}
						handleSubmit={handleCreate}
					/>
				)}
				<Card>
					<CardBody>
						<Form.Group controlId="search" className="mb-3 mt-2">
							<Form.Control
								onChange={(e) => {
									setKeyword(e.target.value);
								}}
								value={keyword}
								placeholder="Cari Username atau Role"
							/>
						</Form.Group>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Username</th>
									<th>Role</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{users &&
									searchPengguna(users, keyword).map(
										(item, idx) => (
											<tr key={idx}>
												<td>{idx + 1}</td>
												<td>{item.username}</td>
												<td>{item.role}</td>
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
															<UpdateUsername
																uuid={item.uuid}
															/>
															<UpdatePassword
																uuid={item.uuid}
															/>
														</Dropdown.Menu>
													</Dropdown>
												</td>
											</tr>
										)
									)}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</DashboardLayout>
		</>
	);
};
