import React, { useRef, useState } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Eren from "../../images/Eren.png";
import { db } from "../../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";

export default function SearchBar() {
	const [searchResult, setSearchResult] = useState([]);
	const searchBarRef = useRef();
	async function searchBarHandler() {
		// console.log(searchBarRef.current.value);
		const searchName = searchBarRef.current.value;
		if (searchName.length > 0) {
			setSearchResult([]);
			console.log("Request send", searchName);
			const collectionRef = collection(db, "members");
			const q = query(
				collectionRef,
				where("search", "array-contains", searchName)
			);
			const queryResult = await getDocs(q);
			// console.log(queryResult);
			queryResult.forEach((doc) => {
				setSearchResult((prevState) => {
					const newData = doc.data();
					newData["id"] = doc.id;
					return [...prevState, newData];
				});
			});
		} else if (searchName.length === 0) {
			setSearchResult([]);
		}
	}

	return (
		<div className="relative shadow-md">
			<div className="flex h-14 w-full">
				<input
					ref={searchBarRef}
					onChange={searchBarHandler}
					placeholder={"Search"}
					className="text h-full w-5/6 rounded-none border-none focus:ring-0"
					type="text"
				/>
				<div className="flex h-full w-1/6 items-center justify-evenly bg-white  px-4">
					<ArrowLeftOnRectangleIcon className="h-7 w-7 cursor-pointer text-gray-500 hover:text-rose-500" />
					<img src={Eren} alt="Profile" className="h-10 w-10 rounded-full" />
				</div>
			</div>
			{searchResult.length > 0 ? (
				<ul className="absolute z-10 flex w-5/6 flex-col gap-4 bg-green-500 p-4">
					{searchResult.map((result) => {
						return (
							<li key={result.id}>
								{result.id} {result.name}
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
}
