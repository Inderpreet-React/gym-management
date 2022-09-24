import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import TdPayment from "./TdPayment";
import { useAuth } from "../../store/AuthContext";

export default function PaymentPanel() {
	const { allPayments } = useAuth();

	return (
		<div className="h-full w-full bg-white p-4 shadow-md">
			<div className="h-full w-full overflow-hidden rounded border-2 border-indigo-400 p-2">
				<table className="w-full table-auto overflow-hidden rounded text-center text-lg">
					<thead className="h-4 w-full  bg-indigo-500  py-4 uppercase text-white">
						<tr>
							<th className="py-2">Name</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Subscription</th>
							<th>Recipt No.</th>
							<th>Payment Mode</th>
						</tr>
					</thead>
					<tbody className="text-gray-700">
						{allPayments.map((payment) => {
							return <TdPayment key={payment.id} payment={payment} />;
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
