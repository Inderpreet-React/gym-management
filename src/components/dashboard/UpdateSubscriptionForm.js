import { Timestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useAuth } from "../../store/AuthContext";

export default function UpdateSubscriptionForm(props) {
	const [paymentMethod, setPaymentMethod] = useState("Cash");
	const paymentMethodRef = useRef();
	const updatePlanRef = useRef();
	const reciptNoRef = useRef();
	const bankNameRef = useRef();
	const cardTypeRef = useRef();
	const transactionIdRef = useRef();
	const { planAmounts } = useAuth();
	const id = props.id;

	const spanClasses = "w-1/3";
	const inputWrapperClasses = "flex items-center gap-4 text-gray-600";

	function paymentChangeHandler() {
		setPaymentMethod(paymentMethodRef.current.value);
	}

	function planUpdateHandler(e) {
		e.preventDefault();
		const userPayload = {};
		const paymentPayload = {};
		const plan = parseInt(updatePlanRef.current.value);
		const planAmount = parseInt(planAmounts[updatePlanRef.current.value]);
		const currentDate = new Date();
		let payloadPlanStartingDate = props.currentPlanEndingDate;
		let payloadEndingDate = Timestamp.fromDate(
			props.currentPlanEndingDate
		).toDate();
		const reciptNo = reciptNoRef.current.value;

		if (payloadEndingDate.getTime() > currentDate.getTime()) {
			payloadEndingDate = new Date(
				payloadEndingDate.setMonth(payloadEndingDate.getMonth() + plan)
			);
		} else {
			payloadPlanStartingDate = Timestamp.now().toDate();
			payloadEndingDate = new Date(
				currentDate.setMonth(currentDate.getMonth() + plan)
			);
		}

		userPayload["currentPlanEndingDate"] = payloadEndingDate;
		userPayload["currentSubscriptionPlan"] = plan;
		userPayload["currentPlanStartingDate"] = payloadPlanStartingDate;

		paymentPayload["amount"] = planAmount;
		paymentPayload["subscriptionBought"] = plan;
		paymentPayload["reciptNo"] = reciptNo;
		paymentPayload["date"] = Timestamp.now().toDate();
		paymentPayload["member"] = id;
		paymentPayload["mode"] = paymentMethod;

		if (paymentMethod === "Card") {
			paymentPayload["bank"] = bankNameRef.current.value;
			paymentPayload["cardtype"] = cardTypeRef.current.value;
			paymentPayload["transactionId"] = transactionIdRef.current.value;
		}

		console.log(userPayload, paymentPayload);
	}
	return (
		<form
			onSubmit={planUpdateHandler}
			className="flex w-1/2 flex-col gap-4 p-4"
		>
			<h1 className="text-center text-lg font-semibold text-gray-500 underline">
				Update Plan
			</h1>
			<div className={inputWrapperClasses}>
				<span className={spanClasses}>Select plan</span>
				<select ref={updatePlanRef}>
					<option value="1">1 Month - ₹ 1000</option>
					<option value="4">4 Month - ₹ 3000</option>
					<option value="6">6 Month - ₹ 5000</option>
					<option value="12">12 Month - ₹ 8000</option>
				</select>
			</div>
			<div className={inputWrapperClasses}>
				<span className={spanClasses}>Method</span>
				<select ref={paymentMethodRef} onChange={paymentChangeHandler}>
					<option value="Cash">Cash</option>
					<option value="Card">Card</option>
				</select>
			</div>
			<div className={inputWrapperClasses}>
				<span className={spanClasses}>Recipt No.</span>
				<input required ref={reciptNoRef} type="text" />
			</div>
			{paymentMethod === "Card" ? (
				<>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Bank Name</span>
						<input required ref={bankNameRef} type="text" />
					</div>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Card</span>
						<select ref={cardTypeRef}>
							<option value="Credit Card">Credit Card</option>
							<option value="Debit Card">Debit Card</option>
						</select>
					</div>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Transaction ID</span>
						<input required ref={transactionIdRef} type="text" />
					</div>
				</>
			) : null}
			<button
				className="self-end rounded bg-indigo-500 py-2 px-8 text-white disabled:cursor-wait disabled:bg-indigo-600 disabled:text-slate-200"
				type="submit"
			>
				Update
			</button>
		</form>
	);
}
