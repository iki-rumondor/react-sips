import React from "react";
import Sidebar from "../Sidebar";

export const PenasihatLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Pembimbing Akademik</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home/penasihat"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.Link path={"/penasihat/mahasiswa"} icon={"fa-user"}>
				Mahasiswa
			</Sidebar.Link>
			<Sidebar.Link path={"/penasihat/kelas"} icon={"fa-user"}>
				Kelas Mahasiswa
			</Sidebar.Link>
		</>
	);
};
