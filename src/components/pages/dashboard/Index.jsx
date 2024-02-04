import DashboardLayout from "../DashboardLayout";
import { BarChart } from "./modules/BarChart";
import { CardDashboard } from "./modules/Card";

export const Home = () => {
	return (
		<>
			<DashboardLayout header={"Selamat Datang Admin"}>
				<div className="row">
					<CardDashboard
						title={"Mata Kuliah"}
						value={10}
						icon="fa-book"
					/>
					<CardDashboard
						title={"Jumlah Dosen"}
						value={10}
						icon="fa-users"
						color="success"
					/>
					<CardDashboard
						title={"Jumlah Laboratorium"}
						value={10}
						icon="fa-book"
						color="danger"
					/>
					<CardDashboard
						title={"Jumlah Dosen"}
						value={10}
						icon="fa-users"
						color="warning"
					/>
				</div>
				<div className="row">
					<BarChart tipe={"bar"} />
					<BarChart tipe={"radar"} />
				</div>
			</DashboardLayout>
		</>
	);
};
