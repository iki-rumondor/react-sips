export const HomeController = () => {
	const role = sessionStorage.getItem("role");
	if (role === "ADMIN") {
		window.location.href = "/home/admin";
		return;
	}

	if (role === "MAHASISWA") {
		window.location.href = "/home/mahasiswa";
		return;
	}

	if (role === "PA") {
		window.location.href = "/home/penasihat";
		return;
	}

	window.location.href = "/home/kaprodi";
	return;
};
