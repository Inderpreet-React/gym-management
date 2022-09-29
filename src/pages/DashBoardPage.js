import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";
import SearchBar from "../components/dashboard/SearchBar";
import DashboardRoutes from "../components/dashboard/DashboardRoutes";
import DashboardLoading from "../components/dashboard/DashboardLoading";

function DashBoardPage(props) {
	const { loggedUser, globalLoading } = useAuth();
	let renderComponent = <DashboardLoading />;

	if (!globalLoading) {
		renderComponent = (
			<div className="flex h-screen w-full bg-indigo-200 md:p-0 lg:p-8">
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

	return (
		<>{loggedUser ? renderComponent : <Navigate to="/" replace={true} />}</>
	);
}

export default DashBoardPage;
