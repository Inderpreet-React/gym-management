import React from "react";
import TdMember from "./TdMember";
import { useAuth } from "../../store/AuthContext";

export default function MembersPanel() {
	const { allMembers } = useAuth();

	return (
		<div className="h-full w-full bg-white p-4 shadow-md">
			<div className="h-full w-full overflow-hidden rounded border-2 border-indigo-400 p-2">
				<table className="w-full table-auto overflow-hidden rounded text-center text-lg">
					<thead className="h-4 w-full  bg-indigo-500  py-4 uppercase text-white">
						<tr>
							<th className="py-2">Name</th>
							<th>Current Plan</th>
							<th>Joined On</th>
							<th>Plan Starting Date</th>
							<th>Plan Ending Date</th>
						</tr>
					</thead>
					<tbody className="text-gray-700">
						{allMembers.map((member, key) => {
							return <TdMember key={key} member={member} />;
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
