import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { fetchAPI } from "./Fetching";

export const convertToMB = (bytes) => {
	const size = (bytes / (1024 * 1024)).toFixed(2);
	return `${size} MB`;
};

export const generateYearArray = (jumlahTahun = 5) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i > currentYear - jumlahTahun; i--) {
        years.push(i);
    }
    return years;
}

export const getUserUuid = () => {
	const token = sessionStorage.getItem("token")
	if (token == null){
		redirect("/login")
	}
	return jwtDecode(token).uuid
}

export const getUserRole = () => {
	const [role, setRole] = useState(null)
	const token = sessionStorage.getItem("token")
	if (token == null){
		redirect("/login")
	}

	const uuid = jwtDecode(token).uuid

	const handleLoad = async () => {
		try {
			const res = await fetchAPI("/api/user/" + uuid);
			setRole(res?.data.role);
		} catch (error) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		handleLoad()
	}, [])

	return role
}
