import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import DashboardLayout from "../DashboardLayout";
import { Card, CardBody, Table } from "react-bootstrap";
import DetailMahasiswa from "./DetailMahasiswa";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import { filterMahasiswa } from "../../utils/Helpers";
import moment from "moment";

export const RekomendasiPA = () => {
	const { setIsLoading, isSuccess, setIsSuccess } = useLoading();
	const [data, setData] = useState(null);
	const [open, setOpen] = useState(false);

	const handleOpen = (value) => {
		setOpen(!open);
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/mahasiswa/prodi/${sessionStorage.getItem("uuid")}`
			);
			setData(filterMahasiswa("rekomendasi", res?.data));
		} catch (error) {
			toast.error(error?.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<DashboardLayout
			header={"Rekomendasi Mahasiswa Dari Penasihat Akademik"}
		>
			<Card>
				<CardBody>
					<Table className="table-bordered">
						<thead>
							<tr>
								<th>No</th>
								<th>Nama Mahasiswa</th>
								<th>Dosen PA </th>
								<th>Direkomendasikan Pada</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((item, idx) => {
									return (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.nama}</td>
											<td>{item.pembimbing.nama}</td>
											<td>{moment.unix(item.created_at / 1000).format("DD-MM-YYYY")}</td>
											<td>
												<DetailMahasiswa
													uuid={item.uuid}
												/>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				</CardBody>
			</Card>
		</DashboardLayout>
	);
};
