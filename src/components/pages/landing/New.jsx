import React, { useEffect, useState } from "react";
// import "/src/assets/css/custom.css";
// import "/src/assets/css/bizland.css";
import "/src/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import { TopBar } from "./sections/TopBar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Card, CardBody, Table } from "react-bootstrap";
import { fetchAPI } from "../../utils/Fetching";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { filterMahasiswa } from "../../utils/Helpers";
import { Footer } from "./sections/Footer";

const NewLandingPage = () => {
	const [mahasiswa, setMahasiswa] = useState(null);
	const [percepatan, setPercepatan] = useState(null);
	const { setIsLoading } = useLoading();
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/percepatan");
			setPercepatan(res.data);
			const res2 = await fetchAPI("/api/mahasiswa");
			setMahasiswa(filterMahasiswa("do", res2.data));
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		handleLoad();
	}, []);
	return (
		<>
			<link
				rel="stylesheet"
				type="text/css"
				href="/src/assets/css/custom.css"
			/>
			;
			<link
				rel="stylesheet"
				type="text/css"
				href="/src/assets/css/bizland.css"
			/>
			;
			<TopBar />
			<Hero />
			<About />
			<div className="bg-white">
				<section id="percepatan" className="px-2 px-sm-5">
					<div className="section-title">
						<h2>Mahasiswa Percepatan</h2>
						{/* <h3>
							Fitur-fitur dari <span>Sippp</span>
						</h3> */}
						<p>
							Berikut adalah daftar mahasiswa yang masuk
							percepatan studi:
						</p>
					</div>
					{percepatan && (
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
								{percepatan.map((item, idx) => (
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
					)}
				</section>
				<section id="do" className="px-2 px-sm-5">
					<div className="section-title">
						<h2>Mahasiswa DO</h2>
						<p>
							Berikut adalah daftar mahasiswa yang terancam drop
							out:
						</p>
					</div>
					{mahasiswa?.length > 0 && (
						<Table className="table-bordered p-3">
							<thead>
								<tr>
									<th>No</th>
									<th>NIM</th>
									<th>Nama Mahasiswa</th>
									<th>Angkatan</th>
								</tr>
							</thead>
							<tbody>
								{mahasiswa.map((item, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{item.nim}</td>
										<td>{item.nama}</td>
										<td>{item.angkatan}</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</section>
			</div>
			<Footer />
		</>
	);
};

export default NewLandingPage;
