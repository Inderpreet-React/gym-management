import React, { useRef, useState } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Eren from "../../images/Eren.png";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import {
	query,
	where,
	collection,
	getDocs,
	doc,
	getDoc,
} from "firebase/firestore";
import { useAuth } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
	const [searchResult, setSearchResult] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const searchBarRef = useRef();
	const { setSearchedMember, setLoggedUser } = useAuth();
	const navigate = useNavigate();

	async function searchBarHandler() {
		setSearchResult([]);
		const searchName = searchBarRef.current.value;
		if (searchName.length >= 3) {
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

	async function updateSearchedMember(e) {
		if (!isLoading) {
			try {
				setIsLoading(true);
				const id = e.target.getAttribute("data-id");
				const docRef = doc(db, "members", id);
				console.log("user request send");
				const docSnap = await getDoc(docRef);
				const newData = {
					id: id,
					name: docSnap.data().name,
					age: docSnap.data().age,
					gender: docSnap.data().gender,
					joiningDate: docSnap.data().joiningDate,
					plan: docSnap.data().currentSubscriptionPlan,
					currentPlanStartingDate: docSnap.data().currentPlanStartingDate,
					currentPlanEndingDate: docSnap.data().currentPlanEndingDate,
					healthIssue: docSnap.data().healthHistory,
				};

				setSearchedMember(newData);
			} catch (e) {
				console.log(e.code, e.message);
			} finally {
				setIsLoading(false);
				setSearchResult([]);
			}
		}
	}

	function signOutHandler() {
		signOut(auth)
			.then(() => {
				setLoggedUser(false);
				console.log("logout sucess");
				navigate("/");
			})
			.catch((e) => {
				console.log("Oh no!");
			});
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
					<ArrowLeftOnRectangleIcon
						onClick={signOutHandler}
						className="h-7 w-7 cursor-pointer text-gray-500 hover:text-rose-500"
					/>
					<img src={Eren} alt="Profile" className="h-10 w-10 rounded-full" />
				</div>
			</div>
			{searchResult.length > 0 ? (
				<ul className="absolute z-10 flex w-5/6 flex-col gap-4 bg-green-500 p-4">
					{searchResult.map((result) => {
						return (
							<li
								className={isLoading ? "cursor-wait" : "cursor-pointer"}
								onClick={updateSearchedMember}
								key={result.id}
								data-id={result.id}
							>
								{result.id} {result.name}
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
}
