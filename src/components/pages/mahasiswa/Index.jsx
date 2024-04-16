import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Card, CardBody, Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import Import from "./Import";
import Detail from "./Detail";
import Edit from "./Edit";
import useLoading from "../../hooks/useLoading";
import Delete from "./Delete";
import DeleteAll from "./DeleteAll";
import { sortJSON } from "../../utils/Helpers";

export default function Mahasiswa() {
	const [values, setValues] = useState([]);
	const { isLoading, isSuccess } = useLoading();

	const handleLoad = async () => {
		try {
			const res = await fetchAPI(
				"/api/mahasiswa/prodi/" + sessionStorage.getItem("uuid")
			);
			res?.data && sortJSON(res?.data, "nim", "asc");
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
			<DashboardLayout header={"Mahasiswa"}>
				<div className="mb-3">
					<Import />
					<DeleteAll />
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
