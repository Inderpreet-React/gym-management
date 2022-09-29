import React from "react";

function NavBar(props) {
	return (
		<div className="fixed top-0 left-0 flex h-14 w-full items-center bg-indigo-500 py-2">
			<div className="flex h-full w-full items-center justify-between px-4 md:px-8">
				<h1 className="text-lg text-white md:text-2xl">Bruh Gym</h1>
				<h1 className="text-lg text-white md:text-2xl">Gym Administration</h1>
			</div>
		</div>
	);
}

export default NavBar;
