import React from "react";
import ExerciseSvg from "../../images/ExerciseSvg.svg";
import { useAuth } from "../../store/AuthContext";

export default function DashboardPanel() {
	const { searchedMember, dateFormat } = useAuth();

	let name = "Simarjeet Singh";
	let age = 23;
	let gender = "Male";
	let joinedOn = "Jan 12, 2019";
	let plan = 4;
	let currentPlanStartingDate = "Feb 12, 2019";
	let currentPlanEndingDate = "June 12, 2019";
	let healthIssue = "Nothing";

	if (searchedMember) {
		name = searchedMember.name;
		age = searchedMember.age;
		gender = searchedMember.gender;
		joinedOn = searchedMember.joiningDate.toDate();
		plan = searchedMember.plan;
		currentPlanStartingDate = searchedMember.currentPlanStartingDate.toDate();
		currentPlanEndingDate = searchedMember.currentPlanEndingDate.toDate();
		healthIssue = searchedMember.healthIssue;
	}

	const thClass = "py-3 pl-4 bg-gray-200 w-1/2";
	const tdClass = "pl-6 py-3";

	return (
		<div className="relative h-full w-full rounded bg-white p-4 shadow-md">
			<div className="flex h-full flex-col rounded border-2 border-indigo-500 p-8 text-gray-700">
				{!searchedMember ? (
					<>
						<img
							src={ExerciseSvg}
							alt="Exercise"
							className="absolute top-1/4 left-1/4 h-1/2 w-1/2"
						/>
						<h3 className="h-1/4 py-12 text-center text-2xl font-bold text-gray-500">
							Welcome to Dashboard
						</h3>
					</>
				) : (
					<div className="flex gap-4">
						<table className="w-1/2 text-left text-lg">
							<tbody>
								<tr>
									<th className={thClass}>Name</th>
									<td className={`${tdClass} capitalize`}>{name}</td>
								</tr>
								<tr>
									<th className={thClass}>Age</th>
									<td className={tdClass}>{age}</td>
								</tr>
								<tr>
									<th className={thClass}>Gender</th>
									<td className={tdClass}>{gender}</td>
								</tr>
								<tr>
									<th className={thClass}>Joined on</th>
									<td className={tdClass}>
										{joinedOn.toLocaleString("en-IN", dateFormat)}
									</td>
								</tr>
								<tr>
									<th className={thClass}>Current Plan</th>
									<td className={tdClass}>{plan}</td>
								</tr>
								<tr>
									<th className={thClass}>Current plan starting date</th>
									<td className={tdClass}>
										{currentPlanStartingDate.toLocaleString(
											"en-IN",
											dateFormat
										)}
									</td>
								</tr>
								<tr>
									<th className={thClass}>Current plan ending date</th>
									<td className={tdClass}>
										{currentPlanEndingDate.toLocaleString("en-IN", dateFormat)}
									</td>
								</tr>
								<tr>
									<th className={thClass}>Health issues</th>
									<td className={tdClass}>
										{healthIssue ? healthIssue : "None"}
									</td>
								</tr>
							</tbody>
						</table>
						<form className="p-4">
							<span>Form</span>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}
