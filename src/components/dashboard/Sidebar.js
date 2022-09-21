import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
	HomeIcon,
	UserIcon,
	UserPlusIcon,
	CreditCardIcon,
} from "@heroicons/react/24/outline";
import { act } from "react-dom/test-utils";

function Sidebar() {
	// const currentLoaction = useLocation();
	// console.log(currentLoaction.pathname);
	const liClasses = "flex items-center gap-4 h-12 pl-2 rounded";
	const iconClasses = "h-5 w-5";
	const activeClasses = { backgroundColor: "rgb(55 48 163)" };

	// function activeClass(path) {
	// 	if (currentLoaction.pathname === path) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	return (
		<nav className="flex h-full w-1/5 flex-col bg-indigo-700 py-8 px-4">
			<h1 className="w-full text-2xl font-bold text-white">Bruh Gym</h1>
			<ul className="text-l mt-8 flex h-56 w-full cursor-pointer flex-col justify-around text-gray-100">
				<NavLink
					to=""
					end
					style={({ isActive }) => (isActive ? activeClasses : undefined)}
					className={liClasses}
				>
					<HomeIcon className={iconClasses} />
					Dashboard
				</NavLink>
				<NavLink
					to="members"
					style={({ isActive }) => (isActive ? activeClasses : undefined)}
					className={liClasses}
				>
					<UserIcon className={iconClasses} />
					Members
				</NavLink>
				<NavLink
					to="addmember"
					style={({ isActive }) => (isActive ? activeClasses : undefined)}
					className={liClasses}
				>
					<UserPlusIcon className={iconClasses} />
					New Member
				</NavLink>
				<NavLink
					to="payment"
					style={({ isActive }) => (isActive ? activeClasses : undefined)}
					className={liClasses}
				>
					<CreditCardIcon className={iconClasses} /> Payment Summary
				</NavLink>
			</ul>
		</nav>
	);
}

export default Sidebar;
