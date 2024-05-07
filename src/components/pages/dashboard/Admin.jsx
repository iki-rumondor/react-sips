import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import DashboardLayout from "../DashboardLayout";
import { fetchAPI } from "../../utils/Fetching";
import toast from "react-hot-toast";
import { CardDashboard } from "./modules/Card";
import { ChartModel, DonutChart } from "../../layout/chart/ApexChart";
import { Card, CardBody, CardHeader } from "react-bootstrap";

export const DashboardAdmin = () => {
	const { setIsLoading, isSuccess } = useLoading();
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
	}, [isSuccess]);
	return (
		<>
			<DashboardLayout header={"Selamat Datang, Administrator"}>
				<div className="row">
					<CardDashboard
						title={"Jumlah Mahasiswa"}
						icon="fa-users"
						color="warning"
						value={mahasiswa?.length ?? 0}
					/>
					<CardDashboard
						title={"Jumlah Pembimbing Akademik"}
						icon="fa-users"
						color="danger"
						value={penasihat?.length ?? 0}
					/>
				</div>
			</DashboardLayout>
		</>
	);
};
