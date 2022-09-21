import React, { useRef } from "react";

export default function NewMemberPanel() {
	const nameRef = useRef();
	const ageRef = useRef();
	const genderRef = useRef();
	const planRef = useRef();
	const healthIssuesCheckboxRef = useRef();
	const healthIssuesRef = useRef();

	const spanClasses = "w-1/3";
	const inputWrapperClasses = "flex items-center gap-2 text-gray-600";

	function onSubmitHandler(e) {
		e.preventDefault();
		const name = nameRef.current.value;
		const age = ageRef.current.value;
		const gender = genderRef.current.value;
		const plan = planRef.current.value;
		const healthIssuesCheckBox = healthIssuesCheckboxRef.current.checked;
		const healthIssue = healthIssuesRef.current.value;
		console.log(
			`${name} \n${age} \n${gender} \n${plan} \n${healthIssuesCheckBox} \n${healthIssue}`
		);
	}

	return (
		<div className="flex h-full w-full justify-center rounded bg-white p-8">
			<div className="flex h-full w-3/4 justify-center rounded border-2 border-indigo-500 p-4">
				<form
					onSubmit={onSubmitHandler}
					className="flex w-full flex-col justify-between gap-4"
				>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Name</span>
						<input ref={nameRef} type="text" />
					</div>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Age</span>
						<input ref={ageRef} type="number" min="16" max="100" />
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
						<select ref={planRef}>
							<option value="1">1 Month</option>
							<option value="4">4 Month</option>
							<option value="6">6 Month</option>
							<option value="12">12 Month</option>
						</select>
					</div>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Health Issues</span>
						<input ref={healthIssuesCheckboxRef} type="checkbox" />
						<textarea ref={healthIssuesRef} className="resize-none" />
					</div>
					<button
						className="self-end rounded bg-indigo-500 py-2 px-8 text-white"
						type="submit"
					>
						Add
					</button>
				</form>
			</div>
		</div>
	);
}
