import React, { useRef, useState, useMemo, useEffect } from "react";
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
import debounce from "lodash.debounce";

export default function SearchBar() {
	const [searchResult, setSearchResult] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [loggingOut, setLoggingOut] = useState(false);
	const searchBarRef = useRef();
	const { setSearchedMember, setLoggedUser } = useAuth();
	const navigate = useNavigate();

	async function searchBarHandler() {
		setSearchResult([]);
		const searchName = searchBarRef.current.value;
		if (searchName.length >= 1) {
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

	const debouncedSearchBarHandler = useMemo(
		() => debounce(searchBarHandler, 300),
		[]
	);

	useEffect(() => {
		return () => {
			debouncedSearchBarHandler.cancel();
		};
	}, [searchResult]);

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
				navigate("/dashboard");
			} catch (e) {
				console.log(e.code, e.message);
			} finally {
				setIsLoading(false);
				setSearchResult([]);
			}
		}
	}

	function signOutHandler() {
		if (!loggingOut) {
			setLoggingOut(true);
			signOut(auth)
				.then(() => {
					setLoggedUser(false);
					console.log("logout sucess");
					navigate("/");
				})
				.catch((e) => {
					console.log("Oh no!");
				})
				.finally(() => {
					setLoggingOut(false);
				});
		}
	}

	return (
		<div className="relative shadow-md">
			<div className="flex h-14 w-full">
				<input
					ref={searchBarRef}
					onChange={debouncedSearchBarHandler}
					placeholder={"Search"}
					className="text h-full w-2/3 rounded-none border-none focus:ring-0 md:w-5/6"
					type="text"
				/>
				<div className="flex h-full w-1/3 items-center justify-evenly bg-white px-4  md:w-1/6">
					<div className="group relative">
						<ArrowLeftOnRectangleIcon
							onClick={signOutHandler}
							className={`h-7 w-7 cursor-pointer text-gray-500 hover:text-rose-500 md:h-8 md:w-8 ${
								loggingOut ? "cursor-wait" : ""
							}`}
						/>
						<div className="absolute top-1/4 right-full italic text-gray-700 opacity-0 group-hover:opacity-100">
							Logout
						</div>
					</div>
					<img src={Eren} alt="Profile" className="h-10 w-10 rounded-full" />
				</div>
			</div>
			{searchResult.length > 0 ? (
				<ul className="absolute z-10 flex w-5/6 flex-col divide-y-2 divide-gray-200 rounded-b-md bg-indigo-500 p-4 text-white">
					{searchResult.map((result) => {
						return (
							<li
								className={`flex min-w-max items-center gap-4 px-2 py-3 capitalize hover:bg-indigo-600 ${
									isLoading ? "cursor-wait" : "cursor-pointer"
								}`}
								onClick={updateSearchedMember}
								key={result.id}
								data-id={result.id}
							>
								{result.name} | {result.age} | {result.gender}
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
}
