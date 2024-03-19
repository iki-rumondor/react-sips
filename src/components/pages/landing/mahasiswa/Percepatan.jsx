import { Table } from "react-bootstrap";
import { Topbar } from "../Topbar";
import useLoading from "../../../hooks/useLoading";
import { fetchAPI } from "../../../utils/Fetching";
import { filterMahasiswa } from "../../../utils/Helpers";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const PercepatanLanding = () => {
	const [percepatan, setPercepatan] = useState(null);
	const { setIsLoading } = useLoading();
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/percepatan");
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
				<section className="mb-5 px-5" style={{ marginTop: "100px" }}>
					<div className="font-weight-bold mb-4 text-center h5">
						Mahasiswa Percepatan Studi
					</div>
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
				</section>
			</div>
		</>
	);
};
