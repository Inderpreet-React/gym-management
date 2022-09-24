import React from "react";

export default function TdMember(props) {
	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.startingDate}</td>
			<td>{props.endingDate}</td>
			<td className="text-indigo-500 underline">Update</td>
		</tr>
	);
}
