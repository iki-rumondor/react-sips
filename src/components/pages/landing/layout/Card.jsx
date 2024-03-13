import React from "react";
import { Card, CardBody } from "react-bootstrap";

export const CardMahasiswa = ({ values }) => {
	return (
		<>
			{/* <Card className="w-100 m-3">
				<CardBody>
					<h4>{values.nama}</h4>
					<hr />
					<div>Nama : {values.nama}</div>
					<div>Jumlah SKS : {values.total_sks}</div>
					<div>IPK: {values.total_sks}</div>
				</CardBody>
			</Card> */}
			<div class="card card-hero m-3 w-100">
				<div class="card-header">
					<div class="card-icon">
						<i class="far fa-user"></i>
					</div>
					<h3>{values.nama}</h3>
					<div class="card-description">{values.nim}</div>
				</div>
				<div class="card-body p-0">
					<div class="tickets-list">
						<a href="#" class="ticket-item">
							<div class="ticket-title">
								<h4>Do you see my mother?</h4>
							</div>
							<div class="ticket-info">
								<div>Syahdan Ubaidillah</div>
								<div class="bullet"></div>
								<div>6 hours ago</div>
							</div>
						</a>
						<a
							href="features-tickets.html"
							class="ticket-item ticket-more"
						>
							View All <i class="fas fa-chevron-right"></i>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};
