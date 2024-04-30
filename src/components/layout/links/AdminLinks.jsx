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
			<Sidebar.Link path={"/admin/user"} icon={"fa-user"}>
				Pengguna
			</Sidebar.Link>
		</>
	);
};
