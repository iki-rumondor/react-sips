import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Button, Card, CardBody, Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import Create from "./Create";
import { postData } from "../../utils/Fetching";
import Import from "./Import";
import Detail from "./Detail";
import Edit from "./Edit";
import useLoading from "../../hooks/useLoading";
import Delete from "./Delete";

export default function Mahasiswa() {
	const [values, setValues] = useState([])
	const {isLoading} = useLoading()

	const handleLoad = async () => {
		try {
			const res = await postData("/api/mahasiswa", "GET");
			setValues(res.data);
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isLoading]);

	return (
		<>
			<DashboardLayout header={"Mahasiswa"}>
				<div className="mb-3">
					<Import />
				</div>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Nim</th>
									<th>Nama</th>
									<th>Angkatan</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.nim}</td>
											<td>{item.nama}</td>
											<td>{item.angkatan}</td>
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
														<Detail
															uuid={item.uuid}
														/>
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
