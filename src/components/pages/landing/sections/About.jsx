import React from "react";

export const About = () => {
	return (
		<section id="tentang" className="about section-bg">
			<div className="container-biz" data-aos="fade-up">
				<div className="section-title">
					<h2>Tentang</h2>
					<h3>
						Fitur-fitur dari <span>Sippp</span>
					</h3>
					<p>
						Berikut adalah beberapa fitur yang dapat dilakukan pada
						sistem informasi
					</p>
				</div>

				<div className="row">
					<div
						className="col-lg-6"
						data-aos="fade-right"
						data-aos-delay="100"
					>
						{/* <img
							src="/src/assets/img/bizland/about.jpg"
							className="img-fluid"
							alt=""
						/> */}
					</div>
					<div className="col-12" data-aos="fade-up" data-aos-delay="100">
						<ul>
							<li>
								<i className="bx bx-store-alt"></i>
								<div>
									<h5>Untuk Mahasiswa</h5>
									<p>
										Mahasiswa prodi sistem informasi dapat menggunakan sistem ini untuk melihat data personal
									</p>
								</div>
							</li>
							<li>
								<i className="bx bx-images"></i>
								<div>
									<h5>
										Magnam soluta odio exercitationem
										reprehenderi
									</h5>
									<p>
										Quo totam dolorum at pariatur aut
										distinctio dolorum laudantium illo
										direna pasata redi
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};
