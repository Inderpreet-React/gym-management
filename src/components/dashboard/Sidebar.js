import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
	HomeIcon,
	UserIcon,
	UserPlusIcon,
	CreditCardIcon,
	EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
	const [showSideBar, setShowSideBar] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const liClasses = "flex items-center gap-4 h-12 pl-2 rounded";
	const iconClasses = "h-5 w-5";
	const activeClasses = { backgroundColor: "rgb(55 48 163)" };

	const setDimension = () => {
		setWindowWidth(window.innerWidth);
	};

	function sidebarHandler() {
		setShowSideBar(!showSideBar);
		console.log("ran");
	}

	useEffect(() => {
		window.addEventListener("resize", setDimension);

		if (windowWidth > 768) {
			setShowSideBar(true);
		}

		return () => {
			window.removeEventListener("resize", setDimension);
		};
	}, [windowWidth]);

	return (
		<>
			<nav
				className={`fixed -left-full z-10 flex h-full flex-col bg-indigo-700 py-8 px-4 transition-all lg:relative lg:top-0 lg:h-full lg:w-1/5 lg:flex-col lg:justify-center ${
					showSideBar ? "-left-0" : ""
				}`}
			>
				<h1 className="w-full text-2xl font-bold text-white lg:absolute lg:top-8 lg:flex">
					Bruh Gym
				</h1>
				<ul className="text-l mt-8 flex w-full cursor-pointer flex-col text-gray-100 md:h-56 md:justify-around">
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
			<div
				onClick={sidebarHandler}
				className="visible fixed right-10 bottom-20 z-10 rounded-full bg-indigo-500 p-4 text-white hover:bg-indigo-600 lg:hidden"
			>
				<EllipsisVerticalIcon className="h-5 w-5" />
			</div>
		</>
	);
}

export default Sidebar;
