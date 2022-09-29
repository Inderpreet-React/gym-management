import React from "react";
import { useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../store/AuthContext";

function LoginForm(props) {
	const { loggedUser, setLoggedUser } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [loading, isLoading] = useState(false);

	const emailRef = useRef();
	const passwordRef = useRef();

	const spanClassName = "text-gray-700";

	function onSubmitHandler(e) {
		e.preventDefault();
		isLoading(true);
		signInWithEmailAndPassword(
			auth,
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((userCredentials) => {
				console.log(userCredentials.user);
				setLoggedUser(userCredentials.user);
				navigate("/dashboard");
			})
			.catch((error) => {
				console.log(error);
				setError(error.message);
			})
			.finally(() => {
				isLoading(false);
			});
	}
	return (
		<>
			{loggedUser ? (
				<Navigate to="/dashboard" replace={true} />
			) : (
				<div className="flex h-full flex-col items-center justify-center gap-4 bg-white p-10">
					<h2 className="text-center text-xl font-bold text-gray-700 md:text-2xl">
						Log In to continue
					</h2>
					<form
						onSubmit={onSubmitHandler}
						className="my-10 flex min-w-full flex-col gap-4 rounded-lg"
					>
						<span className={spanClassName}>Email</span>
						<input ref={emailRef} type="email" required />

						<span className={spanClassName}>Password</span>
						<input ref={passwordRef} type="password" required />
						<button
							type="submit"
							disabled={loading}
							className={`mt-4 self-end rounded bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-700 focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 ${
								loading ? "cursor-wait" : ""
							}`}
						>
							Log In
						</button>
					</form>
					{error ? <p>Error</p> : null}
					<p className="text-center text-gray-700">
						Contact Admin for any log in related issues.
					</p>
				</div>
			)}
		</>
	);
}

export default LoginForm;
