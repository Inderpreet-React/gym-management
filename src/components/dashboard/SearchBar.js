import React from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Eren from "../../images/Eren.png";

export default function SearchBar() {
	return (
		<div className="flex h-14 w-full">
			<input
				placeholder={"Search"}
				className="text h-full w-5/6 rounded-none border-none focus:ring-0"
				type="text"
			/>
			<div className="flex h-full w-1/6 items-center justify-evenly bg-white  px-4">
				<ArrowLeftOnRectangleIcon className="h-7 w-7 cursor-pointer text-gray-500 hover:text-rose-500" />
				<img src={Eren} alt="Profile" className="h-10 w-10 rounded-full" />
			</div>
		</div>
	);
}
