import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import {
	ArrowLeftOnRectangleIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Eren from "../images/Eren.png";

function DashBoardPage(props) {
	return (
		<div className="flex h-screen w-full bg-indigo-200 p-8">
			<div className="flex w-full overflow-hidden rounded-lg bg-gray-200">
				<Sidebar />
				<div className="m-2 flex h-full w-full flex-auto flex-col bg-gray-200">
					<div className="shadow-md">
						<div className="flex h-14 w-full">
							<input
								placeholder={"Search"}
								className="text h-full w-5/6 rounded-none border-none focus:ring-0"
								type="text"
							/>
							<div className="flex h-full w-1/6 items-center justify-evenly bg-white  px-4">
								<ArrowLeftOnRectangleIcon className="h-7 w-7 cursor-pointer text-gray-500 hover:text-rose-500" />
								<img
									src={Eren}
									alt="Profile"
									className="h-10 w-10 rounded-full"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashBoardPage;
