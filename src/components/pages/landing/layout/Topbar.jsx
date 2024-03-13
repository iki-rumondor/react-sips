import { Button } from "react-bootstrap";

export const Topbar = () => {
	return (
		<>
			<div className="d-flex bg-white justify-content-between py-3 px-5">
				{/* <a href="#" className="navbar-brand text-white">
					SIPS
				</a> */}
				<div></div>
				<Button variant="primary" href="/login">Login Admin</Button>
			</div>
		</>
	);
};
