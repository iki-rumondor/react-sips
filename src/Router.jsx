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
import { NewestLanding } from "./components/pages/landing/Newest";
import { PercepatanLanding } from "./components/pages/landing/mahasiswa/Percepatan";
import { DropoutLanding } from "./components/pages/landing/mahasiswa/Dropout";
import { NewLogin } from "./components/pages/auth/NewLogin";
import { MasterProdi } from "./components/pages/admin/MasterProdi";
import { KelasJurusan } from "./components/pages/kajur/Kelas";
import MahasiswaJurusan from "./components/pages/kajur/Mahasiswa";
import { MasterUser } from "./components/pages/admin/MasterUser";
import { MahasiswaPotensial } from "./components/pages/penasihat/Potensial";
import { RekomendasiPA } from "./components/pages/kaprodi/Rekomendasi";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route element={<RoleAuth name={"KAJUR"} />}>
						<Route path="/home/admin" Component={Home}></Route>
						<Route path="/tahun-ajaran" element={<TahunAjaran />} />
						<Route path="/mahasiswa" element={<Mahasiswa />} />
						<Route path="/percepatan" element={<Percepatan />} />
						<Route path="/kelas" element={<Kelas />} />
						<Route path="/pembimbing" element={<Pembimbing />} />
						<Route
							path="/pengaturan"
							element={<SettingPercepatan />}
						/>
						<Route
							path="/setting"
							element={<SettingPercepatan />}
						/>
						<Route path="/prodi" element={<MasterProdi />} />
						<Route path="/kajur/kelas" element={<KelasJurusan />} />
						<Route
							path="/kajur/mahasiswa"
							element={<MahasiswaJurusan />}
						/>
					</Route>
					<Route element={<RoleAuth name={"MAHASISWA"} />}>
						<Route
							path="/home/mahasiswa"
							element={<DashboardMahasiswa />}
						/>
					</Route>
					<Route element={<RoleAuth name={"ADMIN"} />}>
						<Route path="/admin/user" element={<MasterUser />} />
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
						<Route
							path="/penasihat/potensial"
							element={<MahasiswaPotensial />}
						/>
					</Route>
					<Route element={<RoleAuth name={"KAPRODI"} />}>
						<Route
							path="/kaprodi/master/mahasiswa"
							element={<Mahasiswa />}
						/>
						<Route
							path="/kaprodi/master/penasihat"
							element={<Pembimbing />}
						/>

						<Route
							path="/home/kaprodi"
							element={<DashboardKaprodi />}
						/>
						<Route
							path="/kaprodi/mahasiswa"
							element={<MahasiswaAll />}
						/>
						<Route path="/kaprodi/kelas" element={<KelasAll />} />
						<Route
							path="/kaprodi/rekomendasi"
							element={<RekomendasiPA />}
						/>
					</Route>
					<Route path="/home" element={<HomeController />} />
					<Route path="/logout" element={<Logout />} />
				</Route>
				<Route element={<RequireLogout />}>
					<Route path="/login" element={<NewLogin />} />
				</Route>
				<Route path="/" Component={NewestLanding} />
				<Route path="/home/percepatan" Component={PercepatanLanding} />
				<Route path="/home/do" Component={DropoutLanding} />
			</Routes>
		</BrowserRouter>
	);
};
