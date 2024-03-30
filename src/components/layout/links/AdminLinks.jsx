import React from "react";
import Sidebar from "../Sidebar";

export const AdminLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Admin</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home/admin"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/prodi"} icon={"fa-user"}>
				Program Studi
			</Sidebar.Link>
			<Sidebar.Link path={"/setting"} icon={"fa-user"}>
				Pengaturan
			</Sidebar.Link>
			<Sidebar.HeaderLink>Output</Sidebar.HeaderLink>
			<Sidebar.Link path={"/kajur/mahasiswa"} icon={"fa-user"}>
				Mahasiswa
			</Sidebar.Link>
			<Sidebar.Link path={"/kajur/kelas"} icon={"fa-user"}>
				Kelas Mahasiswa
			</Sidebar.Link>
			{/* <Sidebar.Link path={"/percepatan"} icon={"fa-user"}>
				Percepatan Studi
			</Sidebar.Link>
			<Sidebar.Link path={"/kelas"} icon={"fa-user"}>
				Pembagian Kelas
			</Sidebar.Link> */}
		</>
	);
};
