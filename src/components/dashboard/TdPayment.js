import React from "react";
import { useAuth } from "../../store/AuthContext";

export default function TbPayment(props) {
	const { memberId, dateFormat } = useAuth();
	const memberName = memberId[props.payment.member];
	const date = props.payment.date.toDate();
	const amount = props.payment.amount;
	const subscriptionBought = props.payment.subscriptionBought;
	const reciptNo = props.payment.reciptNo;
	const mode = props.payment.mode;
	console.log(mode);

	const tdClassName = "py-2 px-4 md:px-0 whitespace-nowrap";
	return (
		<tr className="odd:bg-gray-200 even:bg-gray-100">
			<td className={`${tdClassName} capitalize`}>{memberName}</td>
			<td className={tdClassName}>
				{date.toLocaleString("en-IN", dateFormat)}
			</td>
			<td className={tdClassName}>{`₹ ${amount}/-`}</td>
			<td className={tdClassName}>{`${subscriptionBought} months`}</td>
			<td className={tdClassName}>{reciptNo}</td>
			<td className={tdClassName}>
				{mode === "Cash"
					? "Cash"
					: `${props.payment.bank} ${props.payment.cardtype}`}
			</td>
		</tr>
	);
}
