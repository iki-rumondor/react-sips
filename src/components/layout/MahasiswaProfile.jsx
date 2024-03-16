import { ListGroupKeyValue } from "../module/List";
import avatar from "/src/assets/img/avatar/avatar-1.png";

export const MahasiswaProfile = ({ data }) => {
	return (
		<div className="col-12">
			<div className="card profile-widget">
				<div className="profile-widget-header">
					<img
						alt="image"
						src={avatar}
						className="rounded-circle profile-widget-picture"
					/>
					<div className="profile-widget-items">
						<div className="profile-widget-item">
							<div className="profile-widget-item-label">
								Total SKS
							</div>
							<div className="profile-widget-item-value">
								{data?.total_sks}
							</div>
						</div>
						<div className="profile-widget-item">
							<div className="profile-widget-item-label">IPK</div>
							<div className="profile-widget-item-value">
								{data?.ipk}
							</div>
						</div>
						<div className="profile-widget-item">
							<div className="profile-widget-item-label">
								MK Error
							</div>
							<div className="profile-widget-item-value text-danger">
								{data?.jumlah_error}
							</div>
						</div>
					</div>
				</div>
				<div className="profile-widget-description">
					<div className="profile-widget-name">
						<span>{data?.nama}</span>
						<div className="text-muted d-inline font-weight-normal">
							<div className="slash"></div>{" "}
							<span>{data?.nim}</span>
						</div>
					</div>
					<ListGroupKeyValue
						keys={"Angkatan"}
						value={data?.angkatan}
					/>
					<ListGroupKeyValue
						keys={"Dosen Penasihat Akademik"}
						value={data?.pembimbing?.nama ?? "Belum Diset"}
					/>
					<ListGroupKeyValue
						keys={"Kelas Yang Harus DiKontrak"}
						value={data?.kelas == "" ? "-" : data?.kelas}
					/>
					<ListGroupKeyValue
						keys={"Status Percepatan"}
						value={data?.percepatan ? "Masuk" : "Tidak Masuk"}
					/>
				</div>
			</div>
		</div>
	);
};
