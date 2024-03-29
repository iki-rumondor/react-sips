import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import { MahasiswaProfile } from "../../layout/MahasiswaProfile";
import { HeroSection } from "../../module/Hero";

export const DashboardMahasiswa = () => {
	const uuid = sessionStorage.getItem("uuid");
	const { setIsLoading, isSuccess } = useLoading();
	const [data, setData] = useState(null);
	const year = new Date().getFullYear();

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/mahasiswa/user/${uuid}`);
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
				{data?.angkatan < year - 3 && (
					<div className="row">
						<HeroSection
							variant="danger"
							title={"Peringatan!!!"}
							subtitle={
								"Anda termasuk mahasiswa yang terancam drop out, segera selesaikan skripsi"
							}
						/>
					</div>
				)}
				{data?.percepatan && (
					<div className="row">
						<HeroSection
							variant="success"
							title={"Selamat Anda Termasuk Mahasiswa Percepatan"}
							subtitle={
								"Silahkan mengajukan topik di SISKP dan berkonsultasi dengan dosen penasihat akademik anda"
							}
						/>
					</div>
				)}
				<div className="row">
					<MahasiswaProfile data={data} />
				</div>
			</DashboardLayout>
		</>
	);
};
