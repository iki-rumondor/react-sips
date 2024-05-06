import React from "react";
import Sidebar from "../Sidebar";

export const PenasihatLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Pembimbing Akademik</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home/penasihat"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.HeaderLink>Mahasiswa</Sidebar.HeaderLink>
			<Sidebar.Link path={"/penasihat/mahasiswa"} icon={"fa-user"}>
				Data Seluruh
			</Sidebar.Link>
			<Sidebar.Link path={"/penasihat/potensial"} icon={"fa-user"}>
				Potensial
			</Sidebar.Link>
			<Sidebar.Link path={"/penasihat/kelas"} icon={"fa-user"}>
				Kelas
			</Sidebar.Link>
		</>
	);
};
