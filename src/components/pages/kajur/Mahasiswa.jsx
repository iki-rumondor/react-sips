import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	Form,
	InputGroup,
	Table,
} from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import DashboardLayout from "../DashboardLayout";
import { fetchAPI, pdfAPI } from "../../utils/Fetching";
import {
	filterMahasiswa,
	getUserUuid,
	searchMahasiswa,
} from "../../utils/Helpers";
import DetailMahasiswa from "./DetailMahasiswa";

export default function MahasiswaJurusan() {
	const [mahasiswa, setMahasiswa] = useState(null);
	const [values, setValues] = useState(null);
	const { setIsLoading } = useLoading();
	const [filter, setFilter] = useState("all");
	const [selectProdi, setSelectProdi] = useState("");
	const [prodi, setProdi] = useState(null);
	const [keyword, setKeyword] = useState("");
	const options = [
		{ name: "Semua Mahasiswa", value: "all" },
		{ name: "Mahasiswa Percepatan", value: "percepatan" },
		{ name: "Mahasiswa Terancam Drop Out", value: "do" },
	];

	const handleChange = () => {
		setValues(filterMahasiswa(filter, mahasiswa, selectProdi));
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/mahasiswa`);
			const res2 = await fetchAPI(`/api/prodi`);
			setValues(res?.data);
			setProdi(res2?.data);
			setMahasiswa(res?.data);
		} catch (error) {
			toast.error(error?.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePrint = async () => {
		try {
			setIsLoading(true);
			let title = "Data Seluruh Mahasiswa";

			if (filter == "percepatan") {
				title = "Data Mahasiswa Percepatan";
			}

			if (filter == "do") {
				title = "Data Mahasiswa Yang Terancam Drop Out";
			}

			const requestBody = {
				title,
				mahasiswa: values,
			};

			const res = await pdfAPI("/mahasiswa", requestBody);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	useEffect(() => {
		handleChange();
	}, [filter, selectProdi]);

	return (
		<>
			<DashboardLayout header={"Data Mahasiswa Sistem Informasi"}>
				<Card>
					<CardBody>
						<Form.Group controlId="filter" className="mb-3">
							<Form.Label>Filter</Form.Label>
							<Form.Control
								as="select"
								value={filter}
								onChange={(e) => {
									setFilter(e.target.value);
								}}
							>
								{options.map((item, idx) => (
									<option key={idx} value={item.value}>
										{item.name}
									</option>
								))}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="prodi" className="mb-3">
							<Form.Label>Program Studi</Form.Label>
							<Form.Control
								as="select"
								value={selectProdi}
								onChange={(e) => {
									setSelectProdi(e.target.value);
								}}
							>
								<option value="" disabled>
									Pilih Program Studi
								</option>
								{prodi &&
									prodi.map((item, idx) => (
										<option key={idx} value={item.name}>
											{item.name}
										</option>
									))}
							</Form.Control>
						</Form.Group>
					</CardBody>
				</Card>
				{selectProdi && values?.length > 0 ? (
					<>
						<Card>
							<CardBody>
								<Button className="mb-3" onClick={handlePrint}>
									<i className="fas fa-print"></i>{" "}
									<span className="ml-2">Cetak</span>
								</Button>
								<Form.Group
									controlId="search"
									className="mb-3 mt-2"
								>
									<Form.Control
										onChange={(e) => {
											setKeyword(e.target.value);
										}}
										value={keyword}
										placeholder="Cari Nama, NIM, atau Angkatan"
									/>
								</Form.Group>
								<Table className="table-bordered">
									<thead>
										<tr>
											<th>No</th>
											<th>Nim</th>
											<th>Nama</th>
											<th>Angkatan</th>
											<th>Prodi</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
										{searchMahasiswa(values, keyword).map(
											(item, idx) => {
												return (
													<tr key={idx}>
														<td>{idx + 1}</td>
														<td>{item.nim}</td>
														<td>{item.nama}</td>
														<td>{item.angkatan}</td>
														<td>{item.prodi}</td>
														<td>
															<DetailMahasiswa
																uuid={item.uuid}
															/>
														</td>
													</tr>
												);
											}
										)}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</>
				) : (
					<>
						<Card>
							<CardBody>
								<div className="text-center">
									Mahasiswa Tidak Ditemukan
								</div>
							</CardBody>
						</Card>
					</>
				)}
			</DashboardLayout>
		</>
	);
}
