import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI, postData } from "../../utils/Fetching";
import { jwtDecode } from "jwt-decode";
const css = `
    *{
        font-family: Poppins;
    }`;

export const NewLogin = () => {
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const { setIsLoading } = useLoading(false);

	const navigate = useNavigate();

	const postHandler = async () => {
		try {
			setIsLoading(true);
			const res = await postData("/api/signin", "POST", values);
			const uuid = jwtDecode(res.token).uuid;
			const userData = await fetchAPI(`/api/user/${uuid}`);
			sessionStorage.setItem("role", userData.data.role);
			sessionStorage.setItem("uuid", userData.data.uuid);
			sessionStorage.setItem("token", res.token);
			return navigate("/home");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<style>{css}</style>
			<div
				className="w-100 overflow-hidden d-flex align-items-center justify-content-center"
				style={{
					minHeight: "100vh",
					backgroundImage: "url(/src/assets/img/bg-login.png)",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div
					style={{ maxWidth: "400px" }}
					className="rounded-lg bg-white m-2 px-5 py-4 shadow d-flex flex-column justify-content-center align-items-center"
				>
					<Link className="text-center" to="/">
						<img
							className="mb-3"
							src="/src/assets/img/logo2.png"
							width={"60%"}
							alt=""
						/>
					</Link>
					<div
						className="text-center mb-2"
						style={{
							fontWeight: "bold",
							fontSize: "1.4rem",
							lineHeight: ".9",
							color: "#4E7ACD",
						}}
					>
						Selamat Datang User
					</div>
					<div
						className="text-center mb-4"
						style={{ fontSize: ".8rem", lineHeight: "1.5" }}
					>
						Sistem informasi percepatan studi, peringatan masa studi
						dan pengelolaan kelas
					</div>
					<div className="w-100">
						<div className="form-group mb-1">
							<label for="username">
								<i
									style={{ color: "#4E7ACD" }}
									className="fas fa-user mr-2"
								></i>
								<span
									style={{
										fontWeight: "500",
										fontSize: ".7rem",
										color: "#4E7ACD",
									}}
								>
									Username
								</span>
							</label>
							<input
								style={{ borderRadius: "10px" }}
								type="text"
								className="form-control"
								id="username"
								placeholder="Masukkan NIM atau NIP"
								value={values.username}
								onChange={(e) =>
									setValues({
										...values,
										username: e.target.value,
									})
								}
							/>
							<small>
								NIM untuk Mahasiswa dan NIP untuk Dosen PA
							</small>
						</div>
						<div className="form-group">
							<label for="password">
								<i
									style={{ color: "#4E7ACD" }}
									className="fas fa-lock mr-2"
								></i>
								<span
									style={{
										fontWeight: "500",
										fontSize: ".7rem",
										color: "#4E7ACD",
									}}
								>
									Password
								</span>
							</label>
							<input
							placeholder="Masukkan Password"
								style={{ borderRadius: "10px" }}
								type="password"
								className="form-control"
								id="password"
								value={values.password}
								onChange={(e) =>
									setValues({
										...values,
										password: e.target.value,
									})
								}
							/>
						</div>
						<Button
							onClick={postHandler}
							className="w-100 mb-3"
							style={{ fontSize: ".7rem" }}
						>
							Masuk
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
