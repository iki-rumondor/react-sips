import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/pages/auth/Login";
import { RequireAuth } from "./components/utils/RequireAuth";
import { RequireLogout } from "./components/utils/RequireLogout";
import Logout from "./components/pages/auth/Logout";
import { Home } from "./components/pages/dashboard/Index";
import Mahasiswa from "./components/pages/mahasiswa/Index";
import TahunAjaran from "./components/pages/tahun_ajaran/Index";
import { LandingPage } from "./components/pages/landing/Index";
import Percepatan from "./components/pages/percepatan/Index";
import Pembimbing from "./components/pages/pembimbing/Index";
import Kelas from "./components/pages/kelas/Index";
import { RoleAuth } from "./components/utils/Authorization";
import { HomeController } from "./components/pages/HomeController";
import { DashboardMahasiswa } from "./components/pages/dashboard/Mahasiswa";
import { DashboardPenasihat } from "./components/pages/dashboard/Penasihat";
import { KelasPenasihat } from "./components/pages/penasihat/Kelas";
import PenasihatMahasiswa from "./components/pages/penasihat/Mahasiswa";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route element={<RoleAuth name={"ADMIN"} />}>
						<Route path="/home/admin" element={<Home />}></Route>
						<Route path="/tahun-ajaran" element={<TahunAjaran />} />
						<Route path="/mahasiswa" element={<Mahasiswa />} />
						<Route path="/percepatan" element={<Percepatan />} />
						<Route path="/kelas" element={<Kelas />} />
						<Route path="/pembimbing" element={<Pembimbing />} />
					</Route>
					<Route element={<RoleAuth name={"MAHASISWA"} />}>
						<Route path="/home/mahasiswa" element={<DashboardMahasiswa />}></Route>
					</Route>
					<Route element={<RoleAuth name={"PA"} />}>
						<Route path="/home/penasihat" element={<DashboardPenasihat />}></Route>
						<Route path="/penasihat/kelas" element={<KelasPenasihat />}></Route>
						<Route path="/penasihat/mahasiswa" element={<PenasihatMahasiswa />}></Route>
					</Route>
					<Route path="/home" element={<HomeController />} />
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="/" element={<LandingPage />} />
			</Routes>
		</BrowserRouter>
	);
};
