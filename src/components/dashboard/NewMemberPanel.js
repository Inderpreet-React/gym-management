import React from "react";

export default function NewMemberPanel() {
	const spanClasses = "w-1/3";
	const inputWrapperClasses = "flex items-center gap-2 text-gray-600";

	return (
		<div className="flex h-full w-full justify-center rounded bg-white p-8">
			<div className="flex h-full w-3/4 justify-center rounded border-2 border-indigo-500 p-4">
				<form className="flex w-full flex-col justify-between gap-4">
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Name</span>
						<input type="text" />
					</div>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Age</span>
						<input type="text" />
					</div>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Gender</span>
						<select>
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Select plan</span>
						<select>
							<option>1 Month</option>
							<option>4 Month</option>
							<option>6 Month</option>
							<option>12 Month</option>
						</select>
					</div>
					<div className={inputWrapperClasses}>
						<span className={spanClasses}>Health Issues</span>
						<input type="checkbox" />
						<textarea className="h-20" />
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
