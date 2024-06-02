import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { fetchAPI } from "./Fetching";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

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

export const yearNowFrom = (from) => {
	const currentYear = new Date().getFullYear();
	const iteration = currentYear - from;
	const years = [];
	for (let i = currentYear; i >= currentYear - iteration; i--) {
		years.push(i);
	}
	return years;
};

export const hitungSemester = (angkatan) => {
	var tahunSekarang = new Date().getFullYear();
	var tahunMasuk = parseInt(angkatan);
	var tahunBerlalu = tahunSekarang - tahunMasuk;

	var jumlahSemester = tahunBerlalu * 2;

	if (new Date().getMonth() >= 6) {
		jumlahSemester += 1;
	}

	return jumlahSemester;
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

	let result = sortJSON(data, "nim", "asc");
	if (filter == "all") {
		result = data.filter((item) => {
			return item.prodi == option;
		});
	}

	if (filter == "percepatan") {
		result = sortJSON(data, "ipk", "desc").filter((item) => {
			return item.percepatan && item.prodi == option;
		});
	}

	if (filter == "do") {
		const currentYear = new Date().getFullYear();
		result = data.filter((item) => {
			return item.angkatan <= currentYear - 5 && item.prodi == option;
		});
	}

	if (filter == "rekomendasi") {
		result = data.filter((item) => {
			return item.rekomendasi;
		});
	}

	if (filter == "potensial") {
		result = data.filter((item) => {
			return (
				item.ipk > 3.5 && item.angkatan > option && !item.rekomendasi
			);
		});
	}

	if (filter == "potensial_do") {
		result = data.filter((item) => {
			if (hitungSemester(item.angkatan) <= 8 && item.ipk < 2.5) {
				return true;
			}

			for (let index = 4; index <= 8; index++) {
				if (
					hitungSemester(item.angkatan) == index &&
					item.total_sks < 20 * (index - 1)
				) {
					return true;
				}
			}

			return false;
		});
	}

	if (filter == "pembagian_kelas") {
		result = data.filter((item) => {
			return item.angkatan >= option;
		});
	}

	if (filter == "prodi") {
		result = data.filter((item) => {
			return item.prodi == option;
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

export const sortJSON = (jsonData, sortBy, sortOrder) => {
	jsonData.sort((a, b) => {
		let comparison = 0;
		if (a[sortBy] > b[sortBy]) {
			comparison = 1;
		} else if (a[sortBy] < b[sortBy]) {
			comparison = -1;
		}
		if (sortOrder === "desc") {
			comparison = comparison * -1;
		}
		return comparison;
	});

	return jsonData;
};

export const searchMahasiswa = (data, keyword) => {
	return data.filter(
		(mhs) =>
			mhs.nama.toLowerCase().includes(keyword.toLowerCase()) ||
			mhs.nim.includes(keyword) ||
			mhs.angkatan.includes(keyword)
	);
};

export const searchPengguna = (data, keyword) => {
	return data.filter(
		(mhs) =>
			mhs.role.toLowerCase().includes(keyword.toLowerCase()) ||
			mhs.username.toLowerCase().includes(keyword.toLowerCase())
	);
};

export const filterHasKajur = (data) => {
	let result = false;
	data.map((item) => {
		if (item.role == "KAJUR") {
			result = true;
		}
	});
	return result;
};

export const setPeringatan = (angkatan) => {
	const currentYear = new Date().getFullYear();
	if (angkatan <= currentYear - 7) {
		return 2;
	}
	if (angkatan <= currentYear - 6) {
		return 1;
	}
	return 0;
};
