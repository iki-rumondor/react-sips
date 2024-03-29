import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
	const location = useLocation();

	const token = sessionStorage.getItem("token");
	if (token == null) {
		return (
			<Navigate
				to={"/login"}
				state={{ path: location.pathname, error: "Silahkan Login Terlebih Dahulu" }}
			/>
		);
	}

	return <Outlet />;
};
