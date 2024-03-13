import React from "react";
import Sidebar from "../Sidebar";

export const MahasiswaLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Mahasiswa</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home/mahasiswa"} icon={"fa-user"}>
				Informasi
			</Sidebar.Link>
		</>
	);
};
