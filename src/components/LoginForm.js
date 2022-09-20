import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function LoginForm(props) {
	const dispatch = useDispatch();
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
				dispatch(login(userCredentials.user));
				navigate("/dashboard");
				isLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setError(error.message);
				isLoading(false);
			});
	}
	return (
		<div className="flex flex-col justify-center gap-4  bg-white p-10">
			<h2 className="text-center text-2xl font-bold text-gray-700">
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
					className="mt-4 self-end rounded bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-700 focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Log In
				</button>
			</form>
			{error ? <p>Error</p> : null}
			<p className="text-center text-gray-700">
				Contact Admin for any log in related issues.
			</p>
		</div>
	);
}

export default LoginForm;
