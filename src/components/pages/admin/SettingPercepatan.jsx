import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Alert, Button, Card, CardBody, Form } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postData } from "../../utils/Fetching";
import toast from "react-hot-toast";

export const SettingPercepatan = () => {
	const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
	const [values, setValues] = useState({
		angkatan_percepatan: "",
		angkatan_kelas: "",
		jumlah_mahasiswa: "",
		total_sks: "",
		ipk: "",
		jumlah_error: "",
	});
	const [change, setChange] = useState(false);

	const currentYear = new Date().getFullYear();

	const defaultData = {
		angkatan_percepatan: `${currentYear - 3}`,
		angkatan_kelas: `${currentYear - 2}`,
		jumlah_mahasiswa: "20",
		total_sks: "120",
		ipk: "3",
		jumlah_error: "0",
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		setChange(true);
	};

	const handleDefault = () => {
		setValues(defaultData);
		setChange(true);
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res1 = await fetchAPI(`/api/pengaturan`);
			const options = {};
			res1.data.map((item) => {
				options[item.name] = item.value;
			});
			setValues(options)
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		console.log(values);
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData("/api/pengaturan", "PUT", values);
			setIsSuccess(true);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
			setIsSuccess(true);
		} finally {
			setIsLoading(false);
			setChange(false)
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout header={"Pengaturan Mahasiswa Percepatan Studi"}>
				{change && (
					<Alert variant="danger">Perubahan Belum Disimpan</Alert>
				)}
				<Card>
					<CardBody>
						<div className="row">
							<div className="col-sm-6">
								<h4 className="mb-4">Percepatan Studi</h4>
								<Form.Group
									className="mb-3"
									controlId="angkatan_percepatan"
								>
									<Form.Label>
										Maksimal Angkatan Untuk Percepatan
									</Form.Label>
									<Form.Control
										name="angkatan_percepatan"
										value={values?.angkatan_percepatan}
										type="number"
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="total_sks"
								>
									<Form.Label>Minimal Total Sks</Form.Label>
									<Form.Control
										name="total_sks"
										value={values?.total_sks}
										type="number"
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="jumlah_error"
								>
									<Form.Label>
										Minimal Jumlah Error
									</Form.Label>
									<Form.Control
										name="jumlah_error"
										value={values?.jumlah_error}
										type="number"
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="ipk">
									<Form.Label>Minimal IPK</Form.Label>
									<Form.Control
										name="ipk"
										value={values?.ipk}
										type="number"
										onChange={handleChange}
									/>
									<small>Contoh: 3 Atau 3.25</small>
								</Form.Group>
							</div>
							<div className="col-sm-6">
								<h4 className="mb-4">Pembagian Kelas</h4>
								<Form.Group
									className="mb-3"
									controlId="angkatan_kelas"
								>
									<Form.Label>
										Maksimal Angkatan Pembagian Kelas
									</Form.Label>
									<Form.Control
										name="angkatan_kelas"
										value={values?.angkatan_kelas}
										type="number"
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="jumlah_mahasiswa"
								>
									<Form.Label>
										Jumlah Mahasiswa Per Kelas
									</Form.Label>
									<Form.Control
										name="jumlah_mahasiswa"
										value={values?.jumlah_mahasiswa}
										type="number"
										onChange={handleChange}
									/>
								</Form.Group>
							</div>
							<div className="col-sm-6"></div>
						</div>

						<div className="d-flex justify-content-end">
							<Button onClick={handleSubmit} className="mx-2">Simpan</Button>
							<Button onClick={handleDefault} variant="secondary">
								Default
							</Button>
						</div>
					</CardBody>
				</Card>
			</DashboardLayout>
		</>
	);
};
