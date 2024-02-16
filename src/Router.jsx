import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/pages/auth/Login";
import { RequireAuth } from "./components/utils/RequireAuth";
import { RequireLogout } from "./components/utils/RequireLogout";
import Logout from "./components/pages/auth/Logout";
import { Home } from "./components/pages/dashboard/Index";
import Mahasiswa from "./components/pages/mahasiswa/Index";
import TahunAjaran from "./components/pages/tahun_ajaran/Index";
import Percepatan from "./components/pages/modul/Index";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Home />}></Route>
					<Route path="/tahun-ajaran" element={<TahunAjaran />} />
					<Route path="/mahasiswa" element={<Mahasiswa />} />
					<Route path="/percepatan" element={<Percepatan />} />
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
