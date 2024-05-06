import React, { useEffect, useState } from "react";
import { fetchAPI, postData } from "../../utils/Fetching";
import toast from "react-hot-toast";
import DashboardLayout from "../DashboardLayout";
import { Button, Card, CardBody, Modal, Table } from "react-bootstrap";
import DetailMahasiswa from "./DetailMahasiswa";
import useLoading from "../../hooks/useLoading";
import { filterMahasiswa } from "../../utils/Helpers";

export const MahasiswaPotensial = () => {
	const { setIsLoading, isSuccess, setIsSuccess } = useLoading();
	const [mahasiswa, setMahasiswa] = useState(null);
	const [selectedUuid, setSelectedUuid] = useState("");
	const [open, setOpen] = useState(false);

	const handleOpen = (value) => {
		setOpen(!open);
		setSelectedUuid(value);
	};

	const handleLoad = async () => {
		try {
			const uuid = sessionStorage.getItem("uuid");
			const res = await fetchAPI(`/api/mahasiswa/penasihat/${uuid}`);
			const res2 = await fetchAPI(`/api/pengaturan/angkatan_percepatan`);
			setMahasiswa(
				filterMahasiswa("potensial", res.data, res2.data.value)
			);
		} catch (error) {
			toast.error(error?.message);
		}
	};

	const handleSubmit = async () => {
		const data = {
			uuid_mahasiswa: selectedUuid,
			uuid_pembimbing: sessionStorage.getItem("uuid"),
		};
		try {
			setOpen(!open)
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData(
				`/api/mahasiswa/rekomendasi`,
				"PATCH",
				data
			);
			setIsSuccess(true);
			toast.success(res?.message);
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
		<>
			<DashboardLayout header={"Mahasiswa Potensial"}>
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
								{mahasiswa &&
									mahasiswa.map((item, idx) => {
										return (
											<tr key={idx}>
												<td>{idx + 1}</td>
												<td>{item.nim}</td>
												<td>{item.nama}</td>
												<td>{item.angkatan}</td>
												<td>
													<Button
														className="mr-1 btn-sm"
														variant="success"
														onClick={() =>
															handleOpen(
																item.uuid
															)
														}
													>
														Rekomendasi
													</Button>
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
				<Modal
					show={open}
					onHide={() => setOpen(!open)}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Rekomendasi Mahasiswa</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Apakah Anda Ingin Merekomendasikan Mahasiswa Tersebut
						Untuk Masuk Percepatan??
					</Modal.Body>
					<Modal.Footer>
						<Button variant="success" onClick={handleSubmit}>
							Setuju
						</Button>
						<Button
							variant="secondary"
							onClick={() => setOpen(!open)}
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</DashboardLayout>
		</>
	);
};
