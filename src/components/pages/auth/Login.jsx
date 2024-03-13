import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { fetchAPI, postData } from "../../utils/Fetching";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { useNavigate } from "react-router-dom";
import "/src/assets/css/style.css"
import "/src/assets/css/components.css"
import { jwtDecode } from "jwt-decode";

export const Login = () => {
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
			const uuid = jwtDecode(res.token).uuid
			const userData = await fetchAPI(`/api/user/${uuid}`)
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
		<div className="d-flex justify-content-center align-items-center">
			<div className="col-12 col-lg-4">
				<div className="login-brand">
					{/* <img src="../assets/img/stisla-fill.svg" alt="logo" width="100" className="shadow-light rounded-circle"/> */}
				</div>
				<div className="card card-primary">
					<div className="card-header">
						<h4>Masuk</h4>
					</div>

					<div className="card-body">
						<Form.Group className="mb-3" controlId="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								value={values.username}
								type="text"
								onChange={(e) =>
									setValues({
										...values,
										username: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								value={values.password}
								type="password"
								onChange={(e) =>
									setValues({
										...values,
										password: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Button onClick={postHandler} className="w-100 mt-2">
							Masuk
						</Button>
					</div>
				</div>
				<div className="simple-footer">
					Created at 2024 by Masita Fitria Manangin
				</div>
			</div>
		</div>
	);
};
