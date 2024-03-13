import React from "react";

export const HeroSection = ({ variant="primary", title, subtitle }) => {
	return (
		<div className="col-12 mb-4">
			<div className={`hero align-items-center bg-${variant} text-white`}>
				<div className="hero-inner text-center">
					<h2>{title}</h2>
					<p className="lead">{subtitle}</p>
				</div>
			</div>
		</div>
	);
};

