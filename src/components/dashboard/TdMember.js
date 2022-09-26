import React from "react";
import { useAuth } from "../../store/AuthContext";

export default function TdMember(props) {
	const name = props.member.name;
	const joinedOn = props.member.joiningDate.toDate();
	const currentPlanStartingDate = props.member.currentPlanStartingDate.toDate();
	const currentPlanEndingDate = props.member.currentPlanEndingDate.toDate();
	const currentSubscriptionPlan = props.member.currentSubscriptionPlan;

	const { dateFormat } = useAuth();
	const tdClassName = "py-2";

	return (
		<tr className="odd:bg-gray-200 even:bg-gray-100">
			<td className={`${tdClassName} capitalize`}>{name}</td>
			<td className={tdClassName}>{`${currentSubscriptionPlan} Months`}</td>
			<td className={tdClassName}>
				{joinedOn.toLocaleString("en-IN", dateFormat)}
			</td>
			<td className={tdClassName}>
				{currentPlanStartingDate.toLocaleString("en-IN", dateFormat)}
			</td>
			<td className={tdClassName}>
				{currentPlanEndingDate.toLocaleString("en-IN", dateFormat)}
			</td>
		</tr>
	);
}
