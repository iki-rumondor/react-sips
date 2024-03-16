import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import DashboardLayout from "../DashboardLayout";
import { fetchAPI } from "../../utils/Fetching";
import toast from "react-hot-toast";
import { CardDashboard } from "./modules/Card";
import { ChartModel, DonutChart } from "../../layout/chart/ApexChart";
import { Card, CardBody, CardHeader } from "react-bootstrap";

export const DashboardPenasihat = () => {
	const { setIsLoading, isSuccess } = useLoading();
	const [data, setData] = useState(null);
	const [dashboard, setDashboard] = useState(null);
	const [user, setUser] = useState(null);
	const uuid = sessionStorage.getItem("uuid");

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/mahasiswa/penasihat/${uuid}`);
			const dashboard = await fetchAPI(
				`/api/dashboard/penasihat/${uuid}`
			);
			console.log(dashboard.data);
			const user = await fetchAPI(`/api/user/${uuid}`);
			setData(res.data);
			setDashboard(dashboard.data);
			setUser(user.data);
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
			<DashboardLayout header={"Selamat Datang, " + user?.penasihat?.nama}>
				<div className="row">
					<CardDashboard
						title={"Jumlah Mahasiswa"}
						icon="fa-users"
						color="warning"
						value={data?.length}
					/>
					<CardDashboard
						title={"Nomor Induk Pegawai"}
						icon="fa-users"
						color="danger"
						value={user?.penasihat?.nip}
					/>
				</div>
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
									labels={dashboard?.listAngkatan ?? []}
									series={dashboard?.amountAngkatan ?? []}
								/>
							</CardBody>
						</Card>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};
