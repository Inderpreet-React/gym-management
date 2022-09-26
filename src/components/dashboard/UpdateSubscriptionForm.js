import React from "react";

export default function UpdateSubscriptionForm() {
	const spanClasses = "w-1/3";
	const inputWrapperClasses = "flex items-center gap-4 text-gray-600";

	function planUpdateHandler(e) {
		e.preventDefault();
	}
	return (
		<form className="flex w-1/2 flex-col gap-4 p-4">
			<h1 className="text-center text-lg font-semibold text-gray-500 underline">
				Update Plan
			</h1>
			<div className={inputWrapperClasses}>
				<span className={spanClasses}>Select plan</span>
				<select>
					<option value="1">1 Month - ₹ 1000</option>
					<option value="4">4 Month - ₹ 3000</option>
					<option value="6">6 Month - ₹ 5000</option>
					<option value="12">12 Month - ₹ 8000</option>
				</select>
			</div>
			<button
				className="self-end rounded bg-indigo-500 py-2 px-8 text-white disabled:cursor-wait disabled:bg-indigo-600 disabled:text-slate-200"
				type="submit"
				onClick={planUpdateHandler}
			>
				Update
			</button>
		</form>
	);
}
