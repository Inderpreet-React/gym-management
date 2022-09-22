import React, { useRef, useState } from "react";
import FormSvg from "../../images/FormSvg.svg";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function NewMemberPanel() {
	// States
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("Cash");
	const [paymentScreen, setPaymentScreen] = useState(false);

	const [nameState, setNameState] = useState("");
	const [ageState, setAgeState] = useState("");
	const [genderState, setGenderState] = useState("");
	const [planState, setPlanState] = useState(1000);
	const [healthState, setHealthState] = useState("");
	const [userPayload, setUserPayload] = useState({});
	const [paymentPayload, setPaymentPayload] = useState({});

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

	// Classes
	const spanClasses = "w-1/3";
	const inputWrapperClasses = "flex items-center gap-4 text-gray-600";
	let renderForm = null;

	// Functions
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
			setNameState(name.trim());
			setAgeState(age.trim());
			setGenderState(gender);
			setPlanState(planAmounts[plan]);
			setHealthState(healthIssue.trim());
			setPaymentScreen(true);
			setUserPayload({
				name: name.trim(),
				age: age.trim(),
				gender: gender,
				healthHistory: healthIssue.trim(),
				currentSubscriptionPlan: plan,
				joiningDate: Timestamp.now(),
				currentPlanStartingDate: Timestamp.now(),
				currentPlanEndingDate: Timestamp.fromDate(
					new Date(currentDate.setMonth(currentDate.getMonth() + plan))
				),
			});
			console.log(userPayload);
		} else {
			setNameState(name.trim());
			setAgeState(age.trim());
			setGenderState(gender);
			setPlanState(planAmounts[plan]);
			setPaymentScreen(true);
			setUserPayload({
				name: name.trim(),
				age: age.trim(),
				gender: gender,
				healthHistory: null,
				currentSubscriptionPlan: plan,
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
		setPlanState(planAmounts[planRef.current.value]);
	}

	function paymentHandler(e) {
		e.preventDefault();
	}

	if (paymentMethod === "Cash") {
		renderForm = (
			<div className={inputWrapperClasses}>
				<span className={spanClasses}>Amount</span>
				<div className="flex h-full w-full items-center rounded border-[1px] border-gray-400">
					<span className="flex h-full w-[10%] items-center justify-center rounded-l bg-gray-100 text-xl  hover:cursor-not-allowed">
						₹
					</span>
					<input
						disabled={true}
						value={planState}
						className="w-[90%] rounded-l-none border-none  hover:cursor-not-allowed"
						type="number"
					/>
				</div>
			</div>
		);
	} else if (paymentMethod === "Card") {
		renderForm = (
			<>
				<div className={inputWrapperClasses}>
					<span className={spanClasses}>Card Number</span>
					<input type="number" />
				</div>
				<div className={inputWrapperClasses}>
					<span className={spanClasses}>Name on card</span>
					<input type="text" />
				</div>
				<div className="flex w-full items-center justify-between gap-12">
					<span className="w-1/4 text-gray-600">Expiray Date</span>
					<input className="w-1/4" type="month" />
					<span className="w-1/4 text-right text-gray-600">CSV</span>
					<input className="w-1/4" type="number" />
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
									<input ref={healthIssuesCheckboxRef} type="checkbox" />
									<textarea ref={healthIssuesRef} className="resize-none" />
								</div>
							</div>
							<button
								className="self-end rounded bg-indigo-500 py-2 px-8 text-white disabled:cursor-wait disabled:bg-indigo-600 disabled:text-slate-200"
								type="submit"
								disabled={loading}
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
							onSubmit={onSubmitHandler}
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
							<button className="self-end rounded bg-indigo-500 py-2 px-8 text-white disabled:cursor-wait disabled:bg-indigo-600 disabled:text-slate-200">
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
