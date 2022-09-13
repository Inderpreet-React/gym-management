import React from "react";

function LoginForm(props) {
	const spanClassName = "text-gray-700";

	function onSubmitHandler(e) {
		e.preventDefault();
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
				<input type="email" required />

				<span className={spanClassName}>Password</span>
				<input type="password" required />
				<button
					type="submit"
					className="mt-4 self-end rounded bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-700 focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Log In
				</button>
			</form>
			<p className="text-center text-gray-700">
				Contact Admin for any log in related issues.
			</p>
		</div>
	);
}

export default LoginForm;
