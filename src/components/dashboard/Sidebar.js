import React from "react";
import {
	HomeIcon,
	UserIcon,
	UserPlusIcon,
	CreditCardIcon,
} from "@heroicons/react/24/outline";

function Sidebar(props) {
	const liClasses = "flex items-center gap-4 h-12 pl-2 rounded";
	const iconClasses = "h-5 w-5";
	const activeClasses = "bg-indigo-900";
	return (
		<nav className="flex h-full w-1/5 flex-col bg-indigo-700 py-8 px-4">
			<h1 className="w-full text-2xl font-bold text-white">Bruh Gym</h1>
			<ul className="text-l mt-8 flex h-[40%] w-full flex-col justify-around text-white">
				<li className={`${liClasses} ${activeClasses}`}>
					<HomeIcon className={iconClasses} />
					Dashboard
				</li>
				<li className={liClasses}>
					<UserIcon className={iconClasses} />
					Members
				</li>
				<li className={liClasses}>
					<UserPlusIcon className={iconClasses} />
					New Member
				</li>
				<li className={liClasses}>
					<CreditCardIcon className={iconClasses} /> Payment Summary
				</li>
			</ul>
		</nav>
	);
}

export default Sidebar;
