import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import DashboardLayout from "../DashboardLayout";
import { BarChart } from "./modules/BarChart";
import { CardDashboard } from "./modules/Card";
import useLoading from "../../hooks/useLoading";
import { useEffect, useState } from "react";

export const Home = () => {
	const { setIsLoading } = useLoading();
	const [mahasiswa, setMahasiswa] = useState(null);
	const [penasihat, setPenasihat] = useState(null);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res1 = await fetchAPI(`/api/mahasiswa`);
			setMahasiswa(res1.data);

			const res2 = await fetchAPI(`/api/pembimbing`);
			setPenasihat(res2.data);

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
			<DashboardLayout header={"Selamat Datang Admin"}>
				<div className="row">
					<CardDashboard
						title={"Jumlah Mahasiswa"}
						value={mahasiswa?.length ?? 0}
						icon="fa-book"
					/>
					<CardDashboard
						title={"Jumlah Dosen"}
						value={penasihat?.length ?? 0}
						icon="fa-users"
						color="success"
					/>
				</div>
			</DashboardLayout>
		</>
	);
};
