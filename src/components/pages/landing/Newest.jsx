import { Card, CardBody, CardHeader, Form, Table } from "react-bootstrap";
import { Topbar } from "./Topbar";
import { fetchAPI } from "../../utils/Fetching";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { useEffect, useState } from "react";
import { filterMahasiswa } from "../../utils/Helpers";

export const NewestLanding = () => {
	const [mahasiswa, setMahasiswa] = useState(null);
	const [dropout, setDropout] = useState(null);
	const [percepatan, setPercepatan] = useState(null);
	const [prodi, setProdi] = useState(null);
	const [selectProdi, setSelectProdi] = useState("");
	const { setIsLoading } = useLoading();

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res2 = await fetchAPI("/api/mahasiswa");
			const res3 = await fetchAPI("/api/prodi");
			setProdi(res3.data);
			setDropout(filterMahasiswa("do", res2.data));
			setMahasiswa(res2.data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoadPercepatan = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/percepatan/prodi/${selectProdi}`);
			setPercepatan(res.data);
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
		if(selectProdi){
			handleLoadPercepatan();
		}
	}, [selectProdi]);

	const info = [
		{
			name: "Jumlah Mahasiswa",
			icon: "student.png",
			value: mahasiswa?.length,
		},
		{
			name: "Lolos Percepatan Studi",
			icon: "graduation.png",
			value: percepatan?.length,
		},
		{
			name: "Terancam Drop Out",
			icon: "warning.png",
			value: dropout?.length,
		},
	];

	return (
		<div className="bg-white w-100 overflow-hidden">
			<Topbar />
			<div
				className="row px-5 px-sm-5 d-flex align-items-center justify-content-center m-auto"
				style={{ minHeight: "80vh" }}
			>
				<div className="col-sm-6">
					<div className="h3 font-weight-bold text-dark mb-3">
						Sistem Informasi Percepatan Studi Peringatan Masa Studi
						& Pengelolaan Kelas di Jurusan Teknik Informatika UNG
					</div>
					<div>
						Program percepatan studi adalah program yang memberikan
						dukungan kepada mahasiswa agar dapat menyelesaikan studi
						dengan lebih cepat atau tepat waktu. “Menggapai Mimpi
						dan Menyelesaikan Studi Tepat Pada Waktunya”
					</div>
					<a
						href="#syarat"
						className="btn btn-lg btn-primary mt-4 px-5 py-2"
					>
						Get Started
					</a>
				</div>
				<div className="col-sm-6 text-center">
					<img
						className="d-none d-sm-block w-100"
						src="/src/assets/img/image-landingpage.png"
					/>
				</div>
			</div>
			<section className="mb-5 d-flex justify-content-center row mx-4 mx-sm-0">
				{info.map((item) => (
					<div
						key={item.name}
						className="shadow p-4 d-flex align-items-center rounded-lg col-sm-3 col-12 mr-sm-3 mb-3 mb-sm-0"
					>
						<div className="mr-3" style={{ width: "50px" }}>
							<img
								src={`/src/assets/img/${item.icon}`}
								className="w-100"
							/>
						</div>
						<div className="">
							<div
								className="font-weight-bold"
								style={{ fontSize: "0.7rem" }}
							>
								{item.name}
							</div>
							<div
								className="font-weight-bold"
								style={{ fontSize: "1.2rem" }}
							>
								{item?.value ?? 0}
							</div>
						</div>
					</div>
				))}
			</section>
			<section className="px-5 mb-5" style={{ marginTop: "100px" }}>
				<div
					id="syarat"
					className="font-weight-bold mb-4 text-center h5"
				>
					Syarat Mengikuti Program Percepatan Studi
				</div>
				<div className="row d-flex align-items-center">
					<div className="col-sm-6 text-center mb-sm-0 mb-5">
						<img width={"60%"} src="/src/assets/img/images.png" />
					</div>
					<div className="col-sm-6">
						<ul>
							<li>Mahasiswa semester 6</li>
							<li>Tidak memiliki mata kuliah error</li>
							<li>Minimal IPK 3.00</li>
							<li>Sudah lulus semua mata kuliah wajib</li>
							<li>Total 100 sks</li>
							<li>Mendapat persetujuan topik dari dosen PA</li>
						</ul>
					</div>
				</div>
			</section>
			<section className="px-5 mb-5" style={{ marginTop: "100px" }}>
				<div className="font-weight-bold mb-4 text-center h5">
					Mahasiswa Percepatan Studi
				</div>
				<Card>
					<CardHeader>
						<Form.Group controlId="prodi">
							<Form.Control
								as="select"
								value={selectProdi}
								onChange={(e) => {
									setSelectProdi(e.target.value);
								}}
							>
								<option value="" disabled>
									---Pilih Program Studi---
								</option>
								{prodi &&
									prodi.map((item) => (
										<option key={item.uuid} value={item.uuid}>
											{item.name}
										</option>
									))}
							</Form.Control>
						</Form.Group>
					</CardHeader>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>NIM</th>
									<th>Nama Mahasiswa</th>
									<th>Angkatan</th>
									<th>Ipk</th>
								</tr>
							</thead>
							<tbody>
								{percepatan &&
									percepatan.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.nim}</td>
											<td>{item.nama}</td>
											<td>{item.angkatan}</td>
											<td>{item.ipk}</td>
										</tr>
									))}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</section>
			<section className="px-5 mb-5" style={{ marginTop: "100px" }}>
				<div className="font-weight-bold mb-4 text-center h5">
					Mahasiswa Terancam Drop Out
				</div>
				<Table className="table-bordered">
					<thead>
						<tr>
							<th>No</th>
							<th>NIM</th>
							<th>Nama Mahasiswa</th>
							<th>Angkatan</th>
							<th>Ipk</th>
							<th>Program Studi</th>
						</tr>
					</thead>
					<tbody>
						{dropout &&
							dropout.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{item.nim}</td>
									<td>{item.nama}</td>
									<td>{item.angkatan}</td>
									<td>{item.ipk}</td>
									<td>{item.prodi}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</section>
			<footer className="d-flex justify-content-center p-4 bg-primary text-white">
				Copyright &#169; Masita Fitria Manangin
			</footer>
		</div>
	);
};
