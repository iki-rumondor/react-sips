import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { fetchAPI } from "./Fetching";
import toast from "react-hot-toast";

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
};

export const getUserUuid = () => {
	const token = sessionStorage.getItem("token");
	if (token == null) {
		redirect("/login");
	}
	return jwtDecode(token).uuid;
};

export const getUserRole = () => {
	const [role, setRole] = useState(null);
	const token = sessionStorage.getItem("token");
	if (token == null) {
		redirect("/login");
	}

	const uuid = jwtDecode(token).uuid;

	const handleLoad = async () => {
		try {
			const res = await fetchAPI("/api/user/" + uuid);
			setRole(res?.data.role);
		} catch (error) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	return role;
};

export const filterMahasiswa = (filter, data, option) => {
	if (data == null) {
		return;
	}

	let result = data;
	if (filter == "percepatan") {
		result = data.filter((item) => {
			return item.percepatan;
		});
	}

	if (filter == "do") {
		const currentYear = new Date().getFullYear();
		result = data.filter((item) => {
			return item.angkatan < currentYear - 5;
		});
	}

	if (filter == "pembagian_kelas") {
		result = data.filter((item) => {
			return item.angkatan > option;
		});
	}

	if (filter == "kelas") {
		result = data.filter((item) => {
			const keys = Object.keys(option);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (option[key] !== "" && item[key] != option[key]) {
					return false;
				}
			}
			return true;
		});
	}

	return result;
};
