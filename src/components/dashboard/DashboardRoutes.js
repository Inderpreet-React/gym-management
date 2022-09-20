import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPanel from "./DashboardPanel";
import NewMemberPanel from "./NewMemberPanel";

export default function DashboardRoutes() {
	return (
		<Routes>
			<Route index element={<DashboardPanel />} />
			<Route path="/addmember" element={<NewMemberPanel />} />
		</Routes>
	);
}
