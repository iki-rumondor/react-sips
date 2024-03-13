import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import DashboardLayout from "../DashboardLayout";
import { fetchAPI } from "../../utils/Fetching";
import toast from "react-hot-toast";
import { CardDashboard } from "./modules/Card";
import { ChartModel } from "../../layout/chart/ApexChart";

export const DashboardPenasihat = () => {
	const { setIsLoading, isSuccess } = useLoading();
	const [data, setData] = useState(null);
	const uuid = sessionStorage.getItem("uuid");

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/mahasiswa/penasihat/${uuid}`);
			setData(res.data);
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
			<DashboardLayout header={"Selamat Datang, " + data?.nama}>
				<div className="row">
					<CardDashboard
						title={"Jumlah Mahasiswa"}
						icon="fa-users"
						color="primary"
						value={data?.length}
					/>
				</div>
				<div className="row">
					<div className="col-6">
						<ChartModel
							categories={["Nama", "Kelas"]}
							type={"bar"}
							series={[
								{
									name: "Data Monev",
									data: [1, 2],
								},
							]}
						/>
					</div>
					<div className="col-6">
						<ChartModel
							categories={["Nama", "Kelas"]}
							type={"donut"}
							series={[1, 2]}
						/>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};
