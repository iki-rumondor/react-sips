import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sprintf } from "sprintf-js";

export const ModulCard = ({ data }) => {
	return (
		<Col md={6}>
			<div className="card card-primary">
				<div className="card-header">
					<h4>Angkatan {data.tahun} </h4>
					<div className="card-header-action">
						<Link to={sprintf("/modules/year/%s", data.uuid)} className="btn btn-primary">Lihat</Link>
					</div>
				</div>
				<div className="card-body">
				</div>
			</div>
		</Col>
	);
};
