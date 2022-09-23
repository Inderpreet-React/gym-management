import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPanel from "./DashboardPanel";
import NewMemberPanel from "./NewMemberPanel";
import MembersPanel from "./MembersPanel";
import PaymentPanel from "./PaymentPanel";

export default function DashboardRoutes() {
	return (
		<Routes>
			<Route index element={<DashboardPanel />} />
			<Route path="/addmember" element={<NewMemberPanel />} />
			<Route path="/members" element={<MembersPanel />} />
			<Route path="/payment" element={<PaymentPanel />} />
		</Routes>
	);
}
