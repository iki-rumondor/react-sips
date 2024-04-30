import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { AdminLinks } from "../layout/links/AdminLinks";
import "/src/assets/css/style.css";
import "/src/assets/css/components.css";
import { MahasiswaLinks } from "../layout/links/MahasiswaLinks";
import { PenasihatLinks } from "../layout/links/PenasihatLinks";
import { KaprodiLinks } from "../layout/links/KaprodiLinks";
import { KajurLinks } from "../layout/links/KajurLinks";

export default function DashboardLayout({ header, children }) {
	const [links, setLinks] = useState();
	const role = sessionStorage.getItem("role");

	useEffect(() => {
		switch (role) {
			case "MAHASISWA":
				setLinks(<MahasiswaLinks />);
				break;
			case "PA":
				setLinks(<PenasihatLinks />);
				break;
			case "KAPRODI":
				setLinks(<KaprodiLinks />);
				break;
			case "KAJUR":
				setLinks(<KajurLinks />);
				break;
			default:
				setLinks(<AdminLinks />);
		}
	}, []);
	return (
		<>
			<Navbar />
			<Sidebar title={"SIPPP"} subtitle={"SP"}>
				{links}
			</Sidebar>
			<div className="main-content">
				<section className="section">
					<div className="section-header">
						<h1>{header}</h1>
					</div>
					<div className="section-body">{children}</div>
				</section>
			</div>
			<footer className="main-footer">
				<div className="footer-left">
					Copyright &copy; 2024 <div className="bullet"></div> Masita Fitria Manangin
				</div>
				<div className="footer-right">V1.0</div>
			</footer>
		</>
	);
}
