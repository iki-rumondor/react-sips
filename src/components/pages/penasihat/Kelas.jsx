import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Form, Table } from "react-bootstrap";
import { fetchAPI, pdfAPI } from "../../utils/Fetching";
import toast from "react-hot-toast";
import { generateYearArray, getUserUuid } from "../../utils/Helpers";
import useLoading from "../../hooks/useLoading";
import DashboardLayout from "../DashboardLayout";

export const KelasPenasihat = () => {
	const { setIsLoading } = useLoading();
	const [mahasiswa, setMahasiswa] = useState(null);
	const [classes, setClasses] = useState(null);
	const years = generateYearArray(3);
	const currentYear = new Date().getFullYear();
	const [options, setOptions] = useState({
		angkatan: "",
		kelas: "",
	});

	const uuid = getUserUuid();

	const handleChangeOptions = (e) => {
		setOptions({ ...options, [e.target.name]: e.target.value });
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res2 = await fetchAPI("/api/pengaturan/angkatan_kelas");
			const batasAngkatan = res2.data.value;

			const res = await fetchAPI(
				`/api/mahasiswa/penasihat/${uuid}?min_angkatan=${batasAngkatan}&angkatan=${options.angkatan}&kelas=${options.kelas}`
			);
			setMahasiswa(res.data);
			const classes = await fetchAPI("/api/classes");
			setClasses(classes.data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePrint = async () => {
		try {
			setIsLoading(true);
			const res = await pdfAPI("/kelas", mahasiswa);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [options]);

	return (
		<DashboardLayout header={"Kelas Mahasiswa"}>
			<Card>
				<CardBody>
					<div className="row">
						<div className="col-6">
							<Form.Group controlId="angkatan" className="mb-3">
								<Form.Label>Angkatan</Form.Label>
								<Form.Control
									as="select"
									name="angkatan"
									value={options.angkatan}
									onChange={handleChangeOptions}
								>
									<option value="">Pilih Angkatan</option>
									{years &&
										years.map((item, idx) => (
											<option key={idx}>{item}</option>
										))}
								</Form.Control>
							</Form.Group>
						</div>
						<div className="col-6">
							<Form.Group controlId="kelas" className="mb-3">
								<Form.Label>Kelas</Form.Label>
								<Form.Control
									as="select"
									name="kelas"
									value={options.kelas}
									onChange={handleChangeOptions}
								>
									<option value="">Pilih Kelas</option>
									{classes &&
										classes.map((item, idx) => {
											if (item == "") {
												return;
											}
											return (
												<option key={idx}>
													{item}
												</option>
											);
										})}
								</Form.Control>
							</Form.Group>
						</div>
					</div>
				</CardBody>
			</Card>
			{mahasiswa && (
				<Card>
					<CardBody>
						<Button className="mb-3" onClick={handlePrint}>
							<i className="fas fa-print"></i>{" "}
							<span className="ml-2">Cetak</span>
						</Button>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>NIM</th>
									<th>Nama Mahasiswa</th>
									<th>Kelas</th>
								</tr>
							</thead>
							<tbody>
								{mahasiswa.map((item, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{item.nim}</td>
										<td>{item.nama}</td>
										<td>{item?.kelas ?? "-"}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			)}
		</DashboardLayout>
	);
};
