import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import SearchBar from "../components/dashboard/SearchBar";
import DashboardRoutes from "../components/dashboard/DashboardRoutes";

function DashBoardPage(props) {
	return (
		<div className="flex h-screen w-full bg-indigo-200 p-8">
			<div className="flex w-full overflow-hidden rounded-lg bg-gray-200">
				<Sidebar />
				<div className="m-2 flex h-full w-full flex-auto flex-col gap-4 bg-gray-200 pb-4">
					<SearchBar />
					<DashboardRoutes />
				</div>
			</div>
		</div>
	);
}

export default DashBoardPage;
