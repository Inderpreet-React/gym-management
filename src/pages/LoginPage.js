import React from "react";
import LoginForm from "../components/LoginForm";
import AuthenticationSvg from "../images/AuthenticationSvg.svg";
import NavBar from "../components/NavBar";

function LoginPage(props) {
	return (
		<div className="h-screen">
			<NavBar />
			<div className="flex h-screen w-full items-center justify-center bg-slate-100">
				<div className="flex items-center rounded bg-indigo-200 shadow-lg">
					<LoginForm />
					<img
						className="h-96 w-96"
						src={AuthenticationSvg}
						alt="Authentication SVG"
					></img>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
