import React from "react";
import Sidebar from "../components/dashboard/Sidebar";

function DashBoardPage(props) {
	return (
		<div className="flex h-screen w-full bg-indigo-200 p-8">
			<div className="w-full overflow-hidden rounded-lg bg-gray-200">
				<Sidebar />
			</div>
		</div>
	);
}

export default DashBoardPage;
