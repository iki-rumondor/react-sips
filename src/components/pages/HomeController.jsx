export const HomeController = () => {
	const role = sessionStorage.getItem("role");
	if (role === "KAJUR") {
		window.location.href = "/home/kajur";
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

	if (role === "ADMIN") {
		window.location.href = "/home/admin";
		return;
	}

	window.location.href = "/home/kaprodi";
	return;
};
