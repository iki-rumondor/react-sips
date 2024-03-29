import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Card, CardBody, Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import Delete from "./Delete";
import Edit from "./Edit";
import { fetchAPI } from "../../utils/Fetching";
import { Create } from "./Create";

export default function TahunAjaran() {
	const [values, setValues] = useState([]);
	const { isLoading } = useLoading();

	const handleLoad = async () => {
		try {
			const res = await fetchAPI("/api/tahun_ajaran");
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
			<DashboardLayout header={"Tahun Ajaran"}>
				<Create />
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Tahun</th>
									<th>Semester</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.tahun}</td>
											<td>{item.semester}</td>
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
