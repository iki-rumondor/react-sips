import React from "react";
import Sidebar from "../Sidebar";

export const AdminLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Admin</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/mahasiswa"} icon={"fa-user"}>
				Mahasiswa
			</Sidebar.Link>
			<Sidebar.Link path={"/pembimbing"} icon={"fa-user"}>
				Penasihat Akademik
			</Sidebar.Link>
			<Sidebar.Link path={"/tahun-ajaran"} icon={"fa-user"}>
				Tahun Ajaran
			</Sidebar.Link>
			<Sidebar.HeaderLink>Proses</Sidebar.HeaderLink>
			<Sidebar.Link path={"/percepatan"} icon={"fa-user"}>
				Percepatan Studi
			</Sidebar.Link>
			<Sidebar.Link path={"/kelas"} icon={"fa-user"}>
				Pembagian Kelas
			</Sidebar.Link>
		</>
	);
};
