import React from "react";

export default function TdMember(props) {
	const name = props.member.name;
	const joinedOn = props.member.joiningDate.toDate();
	const currentPlanStartingDate = props.member.currentPlanStartingDate.toDate();
	const currentPlanEndingDate = props.member.currentPlanEndingDate.toDate();
	const currentSubscriptionPlan = props.member.currentSubscriptionPlan;

	const tdClassName = "py-2";

	return (
		<tr className="odd:bg-gray-200 even:bg-gray-100">
			<td className={tdClassName}>{name}</td>
			<td className={tdClassName}>{`${currentSubscriptionPlan} Months`}</td>
			<td
				className={tdClassName}
			>{`${joinedOn.getDate()}/${joinedOn.getMonth()}/${joinedOn.getFullYear()}`}</td>
			<td
				className={tdClassName}
			>{`${currentPlanStartingDate.getDate()}/${currentPlanStartingDate.getMonth()}/${currentPlanStartingDate.getFullYear()}`}</td>
			<td
				className={tdClassName}
			>{`${currentPlanEndingDate.getDate()}/${currentPlanEndingDate.getMonth()}/${currentPlanEndingDate.getFullYear()}`}</td>
		</tr>
	);
}
