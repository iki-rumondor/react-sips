import React from "react";

export const Hero = () => {
	return (
		<section id="hero" className="d-flex align-items-center">
			<div
				className="container-biz"
				data-aos="zoom-out"
				data-aos-delay="100"
			>
				<h1>
					Selamat Datang Di <span>Sippp</span>
				</h1>
				<p>
					Sistem Informasi Percepatan Studi, Pengelolaan Data
					Mahasiswa, dan Pembagian Kelas Program Studi Sistem
					Informasi Universitas Negeri Gorontalo
				</p>
				<div className="d-flex">
					<a href="/login" className="btn-get-started scrollto">
						Login
					</a>
				</div>
			</div>
		</section>
	);
};
