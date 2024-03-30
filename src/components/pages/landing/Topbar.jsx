import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import classNames from "classnames";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export const Topbar = () => {
	const { pathname } = useLocation();
	const links = [
		{ name: "Beranda", href: "/" },
		{ name: "Percepatan Studi", href: "/home/percepatan" },
		{ name: "Drop Out", href: "/home/do" },
	];
	const loc = useLocation();
	const role = sessionStorage.getItem("role");
	const [show, setShow] = useState(false);

	return (
		<>
			<link
				rel="stylesheet"
				href="/src/assets/css/landingpage/custom.css"
			/>
			<div className="d-flex w-100 justify-content-between px-5 py-2 align-items-center shadow-sm">
				<div className="d-flex align-items-center">
					<img style={{ width: "120px" }} src={logo} />
				</div>
				<div className="d-md-flex d-none align-items-center position-relative ">
					<div>
						{links.map((item, idx) => (
							<Link
								key={idx}
								to={item.href}
								className={classNames(
									"linkStyle",
									pathname == item.href && "active-link"
								)}
							>
								{item.name}
							</Link>
						))}
					</div>
					{role ? (
						<Link
							className="btn btn-primary ml-5 px-4"
							to={"/home"}
						>
							Dashboard
						</Link>
					) : (
						<Link
							className="btn btn-primary ml-5 px-4"
							to={"/login"}
						>
							Login
						</Link>
					)}
				</div>

				<i
					style={{ fontSize: "1.6rem", cursor: "pointer" }}
					className="bi bi-list mobile-nav-toggle d-md-none d-block"
					onClick={() => setShow(true)}
				></i>
			</div>
			<div className={classNames("sidenav", show && "side-active")}>
				<a class="closebtn" onClick={() => setShow(false)}>
					&times;
				</a>
				{role ? (
					<a href="/home">Dashboard</a>
				) : (
					<Link to={"/login"}>Login</Link>
				)}
				{links.map((item, idx) => (
					<a
						key={idx}
						href={item.href}
						className={`/${loc.hash}` == item.href && "active-link"}
					>
						{item.name}
					</a>
				))}
				{role && (
					<>
						<hr />
						<a href="/logout" className="text-danger">
							Logout
						</a>
					</>
				)}
			</div>
		</>
	);
};
