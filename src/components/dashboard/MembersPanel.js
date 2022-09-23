import React from "react";
import Tb from "./Tb";

export default function MembersPanel() {
	return (
		<div className="h-full w-full bg-white p-4 shadow-md">
			<div className="h-full w-full overflow-hidden rounded border-2 border-indigo-400 p-2">
				<table className="w-full  text-center text-lg">
					<thead className="h-4 w-full rounded-t bg-gray-400  py-4 text-white">
						<tr className="">
							<th>Name</th>
							<th>Current Subscription Starting</th>
							<th>Current Subscription Ending</th>
							<th>Update Subscription</th>
						</tr>
					</thead>
					<tbody>
						<Tb
							name={"Simarjeet Singh"}
							startingDate={"12 Dec 2021"}
							endingDate={"12 Jan 2022"}
						/>
						<Tb
							name={"Ayush"}
							startingDate={"22 Dec 2021"}
							endingDate={"22 March 2022"}
						/>
					</tbody>
				</table>
			</div>
		</div>
	);
}
