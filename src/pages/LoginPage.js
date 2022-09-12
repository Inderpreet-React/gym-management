import React from "react";

function LoginPage(props) {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<form className="flex h-1/5 w-1/4 flex-col">
				<span>Username</span>
				<input type="text" />
				<span>Password</span>
				<input type="password" />
				<button type="submit">Log In</button>
			</form>
		</div>
	);
}

export default LoginPage;
