import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Card, CardBody, Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import Edit from "./Edit";
import useLoading from "../../hooks/useLoading";
import Delete from "./Delete";
import Create from "./Create";

export default function Pembimbing() {
	const [values, setValues] = useState([]);
	const { isSuccess } = useLoading();
	const uuid = sessionStorage.getItem("uuid");
	const handleLoad = async () => {
		try {
			const res = await fetchAPI("/api/pembimbing/prodi/" + uuid);
			setValues(res?.data);
		} catch (error) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout header={"Pembimbing Akademik"}>
				<div className="mb-3">
					<Create />
				</div>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Nama</th>
									<th>Nip</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.nama}</td>
											<td>{item.nip}</td>
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
														<Edit
															uuid={item.uuid}
														/>
														<Delete
															uuid={item.uuid}
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
}
