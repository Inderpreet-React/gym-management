import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import TbPayment from "./TbPayment";
import { useAuth } from "../../store/AuthContext";

export default function PaymentPanel() {
	const [allPayments, setAllPayments] = useState([]);
	const { initialPaymentsFetched, setInitialPaymentsFetched } = useAuth();

	useEffect(() => {
		if (!initialPaymentsFetched) {
			if (allPayments.length > 0) {
				return;
			}
			console.log("request dispatched");
			async function fetchPayments() {
				const querySnapshot = await getDocs(collection(db, "payment"));
				querySnapshot.forEach((doc) => {
					setAllPayments((prevState) => {
						return [...prevState, doc.data()];
					});
				});
				setInitialPaymentsFetched(true);
			}
			fetchPayments();
		}
	});

	return (
		<div className="h-full w-full bg-white p-4 shadow-md">
			<div className="h-full w-full overflow-hidden rounded border-2 border-indigo-400 p-2">
				<table className="w-full  text-center text-lg">
					<thead className="h-4 w-full rounded-t bg-gray-400  py-4 text-white">
						<tr className="">
							<th>Name</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Subscription</th>
						</tr>
					</thead>
					<tbody>
						<TbPayment
							name={"Simarjeet Singh"}
							paymentDate={"12 Dec 2021"}
							amount={"1000"}
							subscription={1}
						/>
						<TbPayment
							name={"Ayush"}
							paymentDate={"5 Dec 2021"}
							amount={"8000"}
							subscription={12}
						/>
					</tbody>
				</table>
			</div>
		</div>
	);
}
