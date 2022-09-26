import React from "react";
// import LoadingSvg from "../../images/LoadingSvg.svg";
import LoadingSvg from "../../images/LoadingSvg.svg";

export default function DashboardLoading() {
	return (
		<div className="flex h-screen w-full bg-indigo-200 p-8">
			<div className="flex w-full items-center justify-center rounded-lg bg-white p-4">
				<div className="flex h-full w-full flex-col items-center justify-center rounded border-2 border-indigo-500">
					<img src={LoadingSvg} alt="Exercise" className="h-3/4 w-3/4" />
					<h3 className="text-xl font-semibold italic text-gray-700">
						Fetching data... Please wait!
					</h3>
				</div>
			</div>
		</div>
	);
}
