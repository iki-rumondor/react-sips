import { Table } from "react-bootstrap";
import { Topbar } from "../Topbar";
import useLoading from "../../../hooks/useLoading";
import { fetchAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const SyaratPercepatan = () => {
	const { setIsLoading } = useLoading();
	const [pengaturan, setPengaturan] = useState({
		ipk: "3.00",
		sks: "100",
	});

	const subjects = [
		{
			code: "EAE60113",
			name: "Pengantar Teknologi dan Sistem Informasi",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE60213",
			name: "Logika Matematika",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE60313",
			name: "Sistem Operasi",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE60413",
			name: "Algoritma dan Struktur Data",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE60513",
			name: "Manajemen dan Organisasi",
			prodi: "Sistem Informasi",
		},
		{
			code: "NAS5360112",
			name: "Agama",
			prodi: "Sistem Informasi",
		},
		{
			code: "NAS5360212",
			name: "Pancasila",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE60624",
			name: "Sistem Basis Data",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE60823",
			name: "Desain dan Pengelolaan Jaringan",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE60923",
			name: "Analisis dan Desain Sistem Informasi",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE61123",
			name: "Analisis Proses Bisnis",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE61223",
			name: "Analisis Desain Berorientasi Objek",
			prodi: "Sistem Informasi",
		},
		{
			code: "NAS5360322",
			name: "Kewarganegaraan",
			prodi: "Sistem Informasi",
		},
		{
			code: "NAS5360422",
			name: "Bahasa Indonesia",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE61433",
			name: "Pemrograman Web",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE61633",
			name: "Pemrograman Berorientasi Objek",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE61833",
			name: "Sistem Informasi Manajemen",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE61933",
			name: "Rekayasa Proses Bisnis",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE62033",
			name: "Tata Kelola Teknologi Informasi",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE62133",
			name: "Teknologi Multimedia",
			prodi: "Sistem Informasi",
		},
		{
			code: "UNG5360532",
			name: "Wawasan Budaya",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE62243",
			name: "Manajemen Project Sistem Informasi",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE62343",
			name: "Pemrograman Aplikasi Mobile",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE62443",
			name: "Manajemen Layanan Teknologi Informasi",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE62543",
			name: "Manajemen Resiko dan Keamanan Informasi",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE62643",
			name: "Statistika",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAE62743",
			name: "Metodologi Penelitian",
			prodi: "Sistem Informasi",
		},
		{
			code: "UNG5360642",
			name: "Bahasa Inggris Terapan",
			prodi: "Sistem Informasi",
		},
		{
			code: "EAF60113",
			name: "Pengantar Teknologi dan Sistem Informasi",
			prodi: "PTI",
		},
		{
			code: "EAF60212",
			name: "Logika Matematika",
			prodi: "PTI",
		},
		{
			code: "EAF60313",
			name: "Sistem Operasi",
			prodi: "PTI",
		},
		{
			code: "EAF60414",
			name: "Algoritma dan Pemrograman",
			prodi: "PTI",
		},
		{
			code: "NAS5760112",
			name: "Agama",
			prodi: "PTI",
		},
		{
			code: "NAS5760212",
			name: "Pancasila",
			prodi: "PTI",
		},
		{
			code: "UNG5760912",
			name: "Pengantar Pendidikan",
			prodi: "PTI",
		},
		{
			code: "UNG5761012",
			name: "Perkembangan Peserta Didik",
			prodi: "PTI",
		},
		{
			code: "EAF60523",
			name: "Desain dan Administrasi Jaringan",
			prodi: "PTI",
		},
		{
			code: "EAF60623",
			name: "Sistem Basis Data",
			prodi: "PTI",
		},
		{
			code: "EAF60723",
			name: "Analisis dan Rekayasa Proses Bisnis",
			prodi: "PTI",
		},
		{
			code: "EAF60823",
			name: "Desain Grafis",
			prodi: "PTI",
		},
		{
			code: "NAS5760322",
			name: "Kewarganegaraan",
			prodi: "PTI",
		},
		{
			code: "NAS5760422",
			name: "Bahasa Indonesia",
			prodi: "PTI",
		},
		{
			code: "UNG5761122",
			name: "Belajar dan Pembelajaran",
			prodi: "PTI",
		},
		{
			code: "UNG5761222",
			name: "Psikologi Pendidikan",
			prodi: "PTI",
		},
		{
			code: "EAF61033",
			name: "Pemrograman Web Kependidikan",
			prodi: "PTI",
		},
		{
			code: "EAF61133",
			name: "Pemrograman Berorientasi Objek",
			prodi: "PTI",
		},
		{
			code: "EAF61233",
			name: "Analisis dan Desain Sistem Informasi",
			prodi: "PTI",
		},
		{
			code: "EAF61933",
			name: "Statistika",
			prodi: "PTI",
		},
		{
			code: "EAF62133",
			name: "Gambar 2D dan Animasi",
			prodi: "PTI",
		},
		{
			code: "EAF62233",
			name: "Strategi Pembelajaran",
			prodi: "PTI",
		},
		{
			code: "UNG5760532",
			name: "Wawasan Budaya",
			prodi: "PTI",
		},
		{
			code: "EAF62443",
			name: "Perencanaan Pembelajaran",
			prodi: "PTI",
		},
		{
			code: "EAF62543",
			name: "Metodologi Penelitian Pendidikan",
			prodi: "PTI",
		},
		{
			code: "EAF62643",
			name: "Cyber Security",
			prodi: "PTI",
		},
		{
			code: "EAF62743",
			name: "Pemrograman Aplikasi Mobile",
			prodi: "PTI",
		},
		{
			code: "EAF62843",
			name: "Multimedia Pendidikan",
			prodi: "PTI",
		},
		{
			code: "EAF62943",
			name: "Evaluasi Pembelajaran",
			prodi: "PTI",
		},
		{
			code: "UNG5760642",
			name: "Bahasa Inggris Terapan",
			prodi: "PTI",
		},
		{
			code: "UNG5761342",
			name: "Profesi Kependidikan",
			prodi: "PTI",
		},
	];

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res4 = await fetchAPI("/api/pengaturan/ipk");
			const res5 = await fetchAPI("/api/pengaturan/total_sks");
			setPengaturan({
				ipk: res4.data.value,
				sks: res5.data.value,
			});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	return (
		<>
			<div
				className="bg-white w-100 overflow-hidden"
				style={{ minHeight: "100vh" }}
			>
				<link
					rel="stylesheet"
					href="/src/assets/css/landingpage/custom.css"
				/>
				<Topbar />
				<section className="px-5 my-5">
					<div
						id="syarat"
						className="font-weight-bold mb-4 text-center h5"
					>
						Syarat Mengikuti Program Percepatan Studi
					</div>
					<div className="row d-flex align-items-center">
						<div className="col-sm-6 text-center mb-sm-0 mb-5">
							<img
								width={"60%"}
								src="/src/assets/img/images.png"
							/>
						</div>
						<div className="col-sm-6">
							<ul>
								<li>Mahasiswa semester 6</li>
								<li>Tidak memiliki mata kuliah error</li>
								<li>Minimal IPK {pengaturan?.ipk}</li>
								<li>Sudah lulus semua mata kuliah wajib</li>
								<li>Total {pengaturan?.sks} sks</li>
								<li>
									Mendapat persetujuan topik dari dosen PA
								</li>
								<li>
									Tidak memiliki nilai C (2.00) untuk cumlaude
								</li>
							</ul>
						</div>
					</div>
				</section>
				<section className="px-5 mb-5" style={{ marginTop: "100px" }}>
					<div
						id="syarat"
						className="font-weight-bold mb-4 text-center h5"
					>
						Daftar Mata Kuliah Wajib
					</div>
					<Table className="table-bordered">
						<thead>
							<tr>
								<th>Kode</th>
								<th>Nama Mata Kuliah</th>
								<th>Program Studi</th>
							</tr>
						</thead>
						<tbody>
							{ subjects.map((item) => (
								<tr>
									<td>{item.code}</td>
									<td>{item.name}</td>
									<td>{item.prodi}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</section>
			</div>
		</>
	);
};
