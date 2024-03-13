import { Button, Card, CardBody, CardHeader, Modal } from "react-bootstrap";
import { Topbar } from "./layout/Topbar";
import HeroImg from "/src/assets/landing_page/assets/img/hero.svg";
import "/src/assets/landing_page/css/custom.css";
import { useState } from "react";
import { fetchAPI, postData } from "../../utils/Fetching";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { CardMahasiswa } from "./layout/Card";

export const LandingPage = () => {
	const [input, setInput] = useState("");
	const [values, setValues] = useState(null);
	const { setIsLoading } = useLoading();

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = async () => {
		if(!input){
			toast.error("Nim Tidak Boleh Kosong");
			return
		}

		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/mahasiswa/nim/${input}`);
			setValues(res.data)
			console.log(res);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Topbar></Topbar>
			<div className="container mt-4">
				<div>
					<div className="row">
						<div className="col-md-6 d-flex align-items-center">
							<div className="p-sm-0 px-3 py-5">
								<div className="m-sm-0 my-3">
									<h2 className="font-weight-bold">
										<strong>SIPS</strong>
									</h2>
									<h4 className="font-weight-bold">
										Sistem Informasi Percepatan Studi
									</h4>
									<p>
										Sistem Informasi ini dapat digunakan
										mahasiswa program studi sistem informasi
										Universitas Negeri Gorontalo untuk
										mengetahui beberapa informasi terkait
										status mahasiswa
									</p>
									<div class="input-group mb-3">
										<input
											value={input}
											onChange={handleChange}
											type="text"
											class="form-control"
											placeholder="Masukkan Nim"
										/>
										<div class="input-group-append">
											<button
												type="button"
												class="btn btn-primary"
												onClick={handleSubmit}
											>
												<i class="fas fa-search"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-6 d-flex align-items-center">
							<img
								src={HeroImg}
								alt="Placeholder"
								className="img-fluid"
							/>
						</div>
					</div>
					<div className="row">
						{values && (
							<CardMahasiswa values={values}/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
