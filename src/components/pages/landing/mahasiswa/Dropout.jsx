import { Table } from "react-bootstrap";
import { Topbar } from "../Topbar";
import useLoading from "../../../hooks/useLoading";
import { fetchAPI } from "../../../utils/Fetching";
import { filterMahasiswa } from "../../../utils/Helpers";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const DropoutLanding = () => {
	const [mahasiswa, setMahasiswa] = useState(null);
	const { setIsLoading } = useLoading();
	const handleLoad = async () => {
		try {
			setIsLoading(true);
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
			<div
				className="bg-white w-100 overflow-hidden"
				style={{ minHeight: "100vh" }}
			>
				<link
					rel="stylesheet"
					href="/src/assets/css/landingpage/custom.css"
				/>
				<Topbar />
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
								<th>Prodi</th>
							</tr>
						</thead>
						<tbody>
							{mahasiswa && mahasiswa.map((item, idx) => (
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
			</div>
		</>
	);
};
