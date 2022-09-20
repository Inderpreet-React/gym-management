import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import SearchBar from "../components/dashboard/SearchBar";
import DashboardPanel from "../components/dashboard/DashboardPanel";

function DashBoardPage(props) {
	return (
		<div className="flex h-screen w-full bg-indigo-200 p-8">
			<div className="flex w-full overflow-hidden rounded-lg bg-gray-200">
				<Sidebar />
				<div className="m-2 flex h-full w-full flex-auto flex-col gap-4 bg-gray-200 pb-4">
					<div className="shadow-md">
						<SearchBar />
					</div>
					<DashboardPanel />
				</div>
			</div>
		</div>
	);
}

export default DashBoardPage;
