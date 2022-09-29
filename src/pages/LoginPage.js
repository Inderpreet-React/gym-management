import React from "react";
import LoginForm from "../components/LoginForm";
import AuthenticationSvg from "../images/AuthenticationSvg.svg";
import NavBar from "../components/NavBar";

function LoginPage(props) {
	return (
		<div className="h-full md:h-screen">
			<NavBar />
			<div className="flex h-screen w-full items-center justify-center bg-slate-100 md:h-screen">
				<div className="flex h-full items-center justify-center bg-indigo-200 md:h-min md:rounded md:shadow-lg">
					<LoginForm />
					<img
						className="hidden h-96 w-96 md:flex"
						src={AuthenticationSvg}
						alt="Authentication SVG"
					></img>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
