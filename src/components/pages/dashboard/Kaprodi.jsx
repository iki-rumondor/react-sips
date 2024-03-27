import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import DashboardLayout from "../DashboardLayout";
import { fetchAPI } from "../../utils/Fetching";
import toast from "react-hot-toast";
import { CardDashboard } from "./modules/Card";
import { ChartModel, DonutChart } from "../../layout/chart/ApexChart";
import { Card, CardBody, CardHeader } from "react-bootstrap";

export const DashboardKaprodi = () => {
	const { setIsLoading, isSuccess } = useLoading();
	const [mahasiswa, setMahasiswa] = useState(null);
	const [penasihat, setPenasihat] = useState(null);
	const [dashboard, setDashboard] = useState(null);
	const uuid = sessionStorage.getItem("uuid");
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res1 = await fetchAPI(`/api/mahasiswa/prodi/${uuid}`);
			setMahasiswa(res1.data);

			const res2 = await fetchAPI(`/api/pembimbing/prodi/${uuid}`);
			setPenasihat(res2.data);

			const res3 = await fetchAPI(
				`/api/dashboard/kaprodi/${sessionStorage.getItem("uuid")}`
			);
			setDashboard(res3.data);
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
			<DashboardLayout
				header={
					"Selamat Datang, Koordinator Program Studi " +
					dashboard?.prodi
				}
			>
				<div className="row">
					<CardDashboard
						title={"Jumlah Mahasiswa"}
						icon="fa-users"
						color="warning"
						value={mahasiswa?.length ?? 0}
					/>
					<CardDashboard
						title={"Jumlah Penasihat Akademik"}
						icon="fa-users"
						color="danger"
						value={penasihat?.length ?? 0}
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
