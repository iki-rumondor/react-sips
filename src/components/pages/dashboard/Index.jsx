import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import DashboardLayout from "../DashboardLayout";
import { BarChart } from "./modules/BarChart";
import { CardDashboard } from "./modules/Card";
import useLoading from "../../hooks/useLoading";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { ChartModel, DonutChart } from "../../layout/chart/ApexChart";

export const Home = () => {
	const { setIsLoading } = useLoading();
	const [mahasiswa, setMahasiswa] = useState(null);
	const [penasihat, setPenasihat] = useState(null);
	const [dashboard, setDashboard] = useState(null);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res1 = await fetchAPI(`/api/mahasiswa`);
			setMahasiswa(res1.data);

			const res2 = await fetchAPI(`/api/pembimbing`);
			setPenasihat(res2.data);

			const res3 = await fetchAPI(`/api/dashboard/kajur`);
			setDashboard(res3.data);
			console.log(res3.data);
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
			<DashboardLayout header={"Selamat Datang Ketua Jurusan"}>
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
				{mahasiswa && (
					<>
						<div className="row">
							<div className="col-sm-6">
								<Card>
									<CardHeader>
										Mahasiswa Berdasarkan Status
									</CardHeader>
									<CardBody>
										<ChartModel
											categories={[
												"Percepatan Studi",
												"Terancam Drop Out",
											]}
											type={"bar"}
											series={[
												{
													name: "Mahasiswa",
													data: [
														dashboard?.percepatan,
														dashboard?.do,
													],
												},
											]}
										/>
									</CardBody>
								</Card>
							</div>
							<div className="col-sm-6">
								<Card>
									<CardHeader>
										Mahasiswa Berdasarkan Program Studi
									</CardHeader>
									<CardBody>
										<ChartModel
											categories={dashboard?.listProdi}
											type={"bar"}
											series={[
												{
													name: "Mahasiswa",
													data: dashboard?.amountProdi,
												},
											]}
										/>
									</CardBody>
								</Card>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<Card>
									<CardHeader>
										Mahasiswa Berdasarkan Angkatan
									</CardHeader>
									<CardBody>
										<DonutChart
											labels={
												dashboard?.listAngkatan ?? []
											}
											series={
												dashboard?.amountAngkatan ?? []
											}
										/>
									</CardBody>
								</Card>
							</div>
						</div>
					</>
				)}
			</DashboardLayout>
		</>
	);
};
