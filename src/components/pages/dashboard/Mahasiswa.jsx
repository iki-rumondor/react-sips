import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import { MahasiswaProfile } from "../../layout/MahasiswaProfile";
import { HeroSection } from "../../module/Hero";
import { setPeringatan } from "../../utils/Helpers";
import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";
import { ListKeyValue } from "../../module/List";
import moment from "moment";

export const DashboardMahasiswa = () => {
	const uuid = sessionStorage.getItem("uuid");
	const { setIsLoading, isSuccess } = useLoading();
	const [data, setData] = useState(null);
	const [message, setMessage] = useState(null);
	const year = new Date().getFullYear();

	const peringatan = [
		{ title: "Peringatan 1 !!!" },
		{ title: "Peringatan 2 !!!" },
		{ title: "Peringatan 3 !!!" },
	];

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

	const handleLoadMessage = async () => {
		try {
			setIsLoading(true);
			const res2 = await fetchAPI(`/api/message/${uuid}`);
			setMessage(res2.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	useEffect(() => {
		handleLoadMessage();
	}, []);

	return (
		<>
			<DashboardLayout header={"Selamat Datang, " + data?.nama}>
				{data?.angkatan <= year - 5 && (
					<div className="row">
						<HeroSection
							variant="danger"
							title={
								peringatan[setPeringatan(data?.angkatan)]?.title
							}
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
								"Silahkan mengajukan topik di SISKP dan berkonsultasi dengan dosen pembimbing akademik anda"
							}
						/>
					</div>
				)}
				{data?.rekomendasi && (
					<div className="row">
						<div className="col-12">
							<Card
								className="border-primary"
								style={{ borderLeft: "3px solid" }}
							>
								<CardHeader>
									<h4>Pemberitahuan</h4>
								</CardHeader>
								<CardBody>
									Anda Direkomendasikan Oleh Pembimbing
									Akademik Untuk Masuk Ke Program Percepatan
								</CardBody>
							</Card>
						</div>
					</div>
				)}

				{message && (
					<div className="row">
						<div className="col-12">
							<Card
								className="border-danger"
								style={{ borderLeft: "3px solid" }}
							>
								<CardHeader>
									<h4 className="text-danger">
										Peringatan!!! Kamu Masuk Dalam Mahasiswa
										Berpotensi Drop Out
									</h4>
								</CardHeader>
								<CardBody>
									Pesan Dari PA: <b>{message.message}</b>
								</CardBody>
								<CardFooter>
									{moment
										.unix(message.created_at / 1000)
										.fromNow()}
								</CardFooter>
							</Card>
						</div>
					</div>
				)}

				<div className="row">
					<MahasiswaProfile data={data} />
				</div>
			</DashboardLayout>
		</>
	);
};
