import React from "react";

export default function TbPayment(props) {
	return (
		<tr className="py-4">
			<td>{props.name}</td>
			<td>{props.paymentDate}</td>
			<td>{props.amount}</td>
			<td>{props.subscription}</td>
		</tr>
	);
}
