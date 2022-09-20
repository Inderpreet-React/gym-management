import React from "react";
import ExerciseSvg from "../../images/ExerciseSvg.svg";

export default function DashboardPanel() {
	return (
		<div className="relative h-full w-full rounded bg-white shadow-md">
			<img
				src={ExerciseSvg}
				alt="Exercise"
				className="absolute top-1/4 left-1/4 h-1/2 w-1/2"
			/>
			<h3 className="h-1/4 py-12 text-center text-2xl font-bold text-gray-500">
				Welcome to Dashboard
			</h3>
		</div>
	);
}
