import React, { useRef, useState } from "react";
import FormSvg from "../../images/FormSvg.svg";
import { db } from "../../firebase";
import {
	collection,
	addDoc,
	Timestamp,
	doc,
	deleteDoc,
} from "firebase/firestore";

export default function NewMemberPanel() {
	// States
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("Cash");
	const [paymentScreen, setPaymentScreen] = useState(false);

	const [planAmountState, setPlanAmountState] = useState(1000);
	const [planState, setPlanState] = useState(1);
	const [userPayload, setUserPayload] = useState({});
	const [healthCheckBox, setHealthCheckBox] = useState(true);

	const planAmounts = {
		1: 1000,
		4: 3000,
		6: 5000,
		12: 8000,
	};

	// Refs
	const nameRef = useRef();
	const ageRef = useRef();
	const genderRef = useRef();
	const planRef = useRef();
	const healthIssuesCheckboxRef = useRef();
	const healthIssuesRef = useRef();
	const paymentMethodRef = useRef(paymentMethod);
	const reciptNoRef = useRef();
	const bankNameRef = useRef();
	const cardTypeRef = useRef();
	const transactionIdRef = useRef();

	// Classes
	const spanClasses = "w-1/3";
	const inputWrapperClasses = "flex items-center gap-4 text-gray-600";
	let renderForm = null;

	// Functions
	async function createUser(userPayload, paymentPayload) {
		try {
			const memberRef = await addDoc(collection(db, "members"), userPayload);
			try {
				paymentPayload["member"] = memberRef.id;
				const paymentRef = await addDoc(
					collection(db, "payment"),
					paymentPayload
				);
				console.log(memberRef.id, paymentRef.id);
			} catch (e) {
				console.log(e.code, e.message);
				setError(e.message);
				await deleteDoc(doc(db, "members", memberRef.id));
			}
		} catch (e) {
			console.log(e.code, e.message);
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}

	function onSubmitHandler(e) {
		e.preventDefault();
		const name = nameRef.current.value;
		const age = ageRef.current.value;
		const gender = genderRef.current.value;
		const plan = planRef.current.value;
		const healthIssuesCheckBox = healthIssuesCheckboxRef.current.checked;
		const healthIssue = healthIssuesRef.current.value;
		const currentDate = new Date();

		if (healthIssuesCheckBox) {
			setPlanAmountState(planAmounts[plan]);
			setPaymentScreen(true);
			setUserPayload({
				name: name.trim(),
				age: parseInt(age.trim()),
				gender: gender,
				healthHistory: healthIssue.trim(),
				currentSubscriptionPlan: parseInt(plan),
				joiningDate: Timestamp.now(),
				currentPlanStartingDate: Timestamp.now(),
				currentPlanEndingDate: Timestamp.fromDate(
					new Date(currentDate.setMonth(currentDate.getMonth() + plan))
				),
			});
			console.log(userPayload);
		} else {
			setPlanAmountState(planAmounts[plan]);
			setPaymentScreen(true);
			setUserPayload({
				name: name.trim(),
				age: parseInt(age.trim()),
				gender: gender,
				healthHistory: null,
				currentSubscriptionPlan: parseInt(plan),
				joiningDate: Timestamp.now(),
				currentPlanStartingDate: Timestamp.now(),
				currentPlanEndingDate: Timestamp.fromDate(
					new Date(currentDate.setMonth(currentDate.getMonth() + plan))
				),
			});
		}
	}

	function paymentChangeHandler(e) {
		// console.log(paymentMethodRef.current.value);
		setPaymentMethod(paymentMethodRef.current.value);
	}

	function planChangeHandler() {
		setPlanAmountState(planAmounts[planRef.current.value]);
		setPlanState(planRef.current.value);
	}

	function healthIssueCheckBoxHandler() {
		setHealthCheckBox(healthIssuesCheckboxRef.current.checked);
	}

	function paymentHandler(e) {
		e.preventDefault();
		setLoading(true);
		if (paymentMethod === "Cash") {
			const recipt = reciptNoRef.current.value;
			const amount = planAmountState;
			const subscriptionBought = parseInt(planState);
			const date = Timestamp.now();
			const paymentPayload = {
				mode: "Cash",
				reciptNo: recipt.trim(),
				amount: amount,
				date: date,
				subscriptionBought: subscriptionBought,
			};
			createUser(userPayload, paymentPayload);
		} else if (paymentMethod === "Card") {
			const bank = bankNameRef.current.value;
			const card = cardTypeRef.current.value;
			const amount = planAmountState;
			const subscriptionBought = parseInt(planState);
			const transactionId = transactionIdRef.current.value;
			const recipt = reciptNoRef.current.value;
			const paymentPayload = {
				mode: "Card",
				bank: bank.trim(),
				cardType: card,
				transactionId: transactionId.trim(),
				reciptNo: recipt,
				amount: amount,
				subscriptionBought: subscriptionBought,
			};
			createUser(userPayload, paymentPayload);
		}
	}

	if (paymentMethod === "Cash") {
		renderForm = (
			<>
				<div className={inputWrapperClasses}>
					<span className={spanClasses}>Amount</span>
					<div className="flex h-full w-full items-center rounded border-[1px] border-gray-400">
						<span className="flex h-full w-[10%] items-center justify-center rounded-l bg-gray-100 text-xl  hover:cursor-not-allowed">
							₹
						</span>
						<input
							disabled={true}
							value={planAmountState}
							className="w-[90%] rounded-l-none border-none  hover:cursor-not-allowed"
							type="number"
						/>
					</div>
				</div>
				<div className={inputWrapperClasses}>
					<span className={spanClasses}>Recipt No.</span>
					<input ref={reciptNoRef} type="text" />
				</div>
			</>
		);
	} else if (paymentMethod === "Card") {
		renderForm = (
			<>
				<div className={inputWrapperClasses}>
					<span className={spanClasses}>Bank Name</span>
					<input ref={bankNameRef} type="text" />
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
					<input ref={transactionIdRef} type="text" />
				</div>
				<div className={inputWrapperClasses}>
					<span className={spanClasses}>Recipt No.</span>
					<input ref={reciptNoRef} type="text" />
				</div>
			</>
		);
	}

	return (
		<div className="h-full w-full bg-white p-4 shadow-md">
			<div className="relative isolate flex h-full w-full flex-col rounded border-2 border-indigo-400 bg-white p-8">
				<img
					src={FormSvg}
					alt="form svg"
					className="absolute right-0 top-1/4 -z-10 h-96 w-96"
				/>
				{/* <h1 className="text-center text-2xl font-bold italic text-indigo-600">
					Add new member form
				</h1> */}

				{!paymentScreen ? (
					<div className="flex h-full w-3/4 flex-col justify-center rounded p-4">
						<form
							onSubmit={onSubmitHandler}
							className="flex w-full flex-col justify-between gap-6"
						>
							<div className={inputWrapperClasses}>
								<span className={spanClasses}>Name</span>
								<input ref={nameRef} type="text" required />
							</div>
							<div className={inputWrapperClasses}>
								<span className={spanClasses}>Age</span>
								<input ref={ageRef} type="number" min="16" max="100" required />
							</div>
							<div className={inputWrapperClasses}>
								<span className={spanClasses}>Gender</span>
								<select ref={genderRef}>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
							<div className={inputWrapperClasses}>
								<span className={spanClasses}>Select plan</span>
								<select ref={planRef} onChange={planChangeHandler}>
									<option value="1">1 Month - ₹ 1000</option>
									<option value="4">4 Month - ₹ 3000</option>
									<option value="6">6 Month - ₹ 5000</option>
									<option value="12">12 Month - ₹ 8000</option>
								</select>
							</div>
							<div className={inputWrapperClasses}>
								<span className={spanClasses}>Health Issues</span>
								<div className="flex w-full items-center gap-4">
									<input
										onChange={healthIssueCheckBoxHandler}
										ref={healthIssuesCheckboxRef}
										type="checkbox"
									/>
									<textarea
										ref={healthIssuesRef}
										disabled={!healthCheckBox}
										className="resize-none disabled:cursor-not-allowed"
									/>
								</div>
							</div>
							<button
								className="self-end rounded bg-indigo-500 py-2 px-8 text-white disabled:cursor-wait disabled:bg-indigo-600 disabled:text-slate-200"
								type="submit"
							>
								Next
							</button>
						</form>
						{error ? <p className="text-rose-500">There was an error</p> : null}
					</div>
				) : (
					""
				)}

				{paymentScreen ? (
					<div className="flex h-full w-3/4 flex-col justify-center rounded p-4">
						<form
							onSubmit={paymentHandler}
							className="flex w-full flex-col justify-between gap-6"
						>
							<div className={inputWrapperClasses}>
								<span className={spanClasses}>Method</span>
								<select ref={paymentMethodRef} onChange={paymentChangeHandler}>
									<option value="Cash">Cash</option>
									<option value="Card">Card</option>
								</select>
							</div>
							{renderForm}
							<button
								disabled={loading}
								type="submit"
								className="self-end rounded bg-indigo-500 py-2 px-8 text-white disabled:cursor-wait disabled:bg-indigo-600 disabled:text-slate-200"
							>
								Add
							</button>
						</form>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}
