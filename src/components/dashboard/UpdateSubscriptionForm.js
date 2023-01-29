import { collection, Timestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { db } from "../../firebase";
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function UpdateSubscriptionForm(props) {
	const [paymentMethod, setPaymentMethod] = useState("Cash");
	const [loading, setLoading] = useState(false);
	const paymentMethodRef = useRef();
	const updatePlanRef = useRef();
	const reciptNoRef = useRef();
	const bankNameRef = useRef();
	const cardTypeRef = useRef();
	const transactionIdRef = useRef();
	const { planAmounts } = useAuth();
	const id = props.id;
	const navigate = useNavigate();

	const spanClasses = "w-1/3";
	const inputWrapperClasses = "flex items-center gap-4 text-gray-600";

	function paymentChangeHandler() {
		setPaymentMethod(paymentMethodRef.current.value);
	}

	async function updateUserData(id, payload) {
		await setDoc(doc(db, "members", id), payload, { merge: true });
	}

	async function createPaymentData(payload) {
		await addDoc(collection(db, "payment"), payload);
		setLoading(false);
		navigate("payment");
	}

	function planUpdateHandler(e) {
		e.preventDefault();
		setLoading(true);
		const userPayload = {};
		const paymentPayload = {};
		const plan = parseInt(updatePlanRef.current.value);
		const planAmount = parseInt(planAmounts[updatePlanRef.current.value]);
		const currentDate = new Date();
		let payloadPlanStartingDate = new Date(
			props.currentPlanEndingDate.getTime()
		);
		let payloadEndingDate = new Date(props.currentPlanEndingDate.getTime());
		const reciptNo = reciptNoRef.current.value;
		console.log(payloadEndingDate, payloadPlanStartingDate);

		if (payloadEndingDate.getTime() > currentDate.getTime()) {
			payloadEndingDate = new Date(
				payloadEndingDate.setMonth(payloadEndingDate.getMonth() + plan)
			);
			console.log("Value greater");
		} else {
			payloadPlanStartingDate = new Date();
			payloadEndingDate = new Date(
				currentDate.setMonth(currentDate.getMonth() + plan)
			);
			console.log("value smaller");
		}

		userPayload["currentPlanEndingDate"] =
			Timestamp.fromDate(payloadEndingDate);
		userPayload["currentSubscriptionPlan"] = plan;
		userPayload["currentPlanStartingDate"] = Timestamp.fromDate(
			payloadPlanStartingDate
		);

		paymentPayload["amount"] = planAmount;
		paymentPayload["subscriptionBought"] = plan;
		paymentPayload["reciptNo"] = reciptNo;
		paymentPayload["date"] = Timestamp.now();
		paymentPayload["member"] = id;
		paymentPayload["mode"] = paymentMethod;

		if (paymentMethod === "Card") {
			paymentPayload["bank"] = bankNameRef.current.value;
			paymentPayload["cardtype"] = cardTypeRef.current.value;
			paymentPayload["transactionId"] = transactionIdRef.current.value;
		}

		console.log(userPayload, paymentPayload, "Payload");
		setLoading(true);
		updateUserData(id, userPayload);
		createPaymentData(paymentPayload);
	}

	return (
		<form
			onSubmit={planUpdateHandler}
			className="flex w-full flex-col gap-4 p-2 text-sm md:w-1/2 md:p-4 md:text-lg"
		>
			<h1 className="text-md text-center font-semibold text-gray-500 underline md:text-lg">
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
				disabled={loading}
			>
				Update
			</button>
		</form>
	);
}
