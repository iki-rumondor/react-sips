import React from "react";
import Sidebar from "../Sidebar";

export const KaprodiLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Kaprodi</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home/kaprodi"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.Link path={"/kaprodi/mahasiswa"} icon={"fa-user"}>
				Mahasiswa
			</Sidebar.Link>
			<Sidebar.Link path={"/kaprodi/kelas"} icon={"fa-user"}>
				Kelas Mahasiswa
			</Sidebar.Link>
		</>
	);
};
