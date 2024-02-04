import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/pages/auth/Login";
import { RequireAuth } from "./components/utils/RequireAuth";
import { RequireLogout } from "./components/utils/RequireLogout";
import Logout from "./components/pages/auth/Logout";
import Subject from "./components/pages/mahasiswa/Index";
import { Home } from "./components/pages/dashboard/Index";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route path="/mahasiswa" element={<Subject />} />
					<Route path="/" element={<Home />}></Route>
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
