import React from "react";
import Sidebar from "../Sidebar";

export const KaprodiLinks = () => {
	return (
		<>
			<Sidebar.Link path={"/home/kaprodi"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/kaprodi/master/mahasiswa"} icon={"fa-user"}>
				Mahasiswa
			</Sidebar.Link>
			<Sidebar.Link path={"/kaprodi/master/penasihat"} icon={"fa-user"}>
				Pembimbing Akademik
			</Sidebar.Link>
			<Sidebar.HeaderLink>Output</Sidebar.HeaderLink>
			<Sidebar.Link path={"/kaprodi/mahasiswa"} icon={"fa-user"}>
				Data Mahasiswa
			</Sidebar.Link>
			<Sidebar.Link path={"/kaprodi/kelas"} icon={"fa-user"}>
				Kelas Mahasiswa
			</Sidebar.Link>
		</>
	);
};
