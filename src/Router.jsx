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
import { DashboardKaprodi } from "./components/pages/dashboard/Kaprodi";
import MahasiswaAll from "./components/pages/kaprodi/Mahasiswa";
import { KelasAll } from "./components/pages/kaprodi/Kelas";
import NewLandingPage from "./components/pages/landing/New";
import { SettingPercepatan } from "./components/pages/admin/SettingPercepatan";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route element={<RoleAuth name={"ADMIN"} />}>
						<Route path="/home/admin" Component={Home}></Route>
						<Route path="/tahun-ajaran" element={<TahunAjaran />} />
						<Route path="/mahasiswa" element={<Mahasiswa />} />
						<Route path="/percepatan" element={<Percepatan />} />
						<Route path="/kelas" element={<Kelas />} />
						<Route path="/pembimbing" element={<Pembimbing />} />
						<Route path="/setting" element={<SettingPercepatan />} />
					</Route>
					<Route element={<RoleAuth name={"MAHASISWA"} />}>
						<Route
							path="/home/mahasiswa"
							element={<DashboardMahasiswa />}
						/>
					</Route>
					<Route element={<RoleAuth name={"PA"} />}>
						<Route
							path="/home/penasihat"
							element={<DashboardPenasihat />}
						/>
						<Route
							path="/penasihat/kelas"
							element={<KelasPenasihat />}
						/>
						<Route
							path="/penasihat/mahasiswa"
							element={<PenasihatMahasiswa />}
						/>
					</Route>
					<Route element={<RoleAuth name={"KAPRODI"} />}>
						<Route
							path="/home/kaprodi"
							element={<DashboardKaprodi />}
						/>
						<Route
							path="/kaprodi/mahasiswa"
							element={<MahasiswaAll />}
						/>
						<Route path="/kaprodi/kelas" element={<KelasAll />} />
					</Route>
					<Route path="/home" element={<HomeController />} />
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="/" Component={NewLandingPage} />
			</Routes>
		</BrowserRouter>
	);
};
