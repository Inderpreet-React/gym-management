import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthContextProvider(props) {
	const [initialLoad, setInitialLoad] = useState(false);
	const [globalLoading, setGlobalLoading] = useState(false);
	const [searchedMember, setSearchedMember] = useState(false);
	const [loggedUser, setLoggedUser] = useState(false);
	const [allPayments, setAllPayments] = useState([]);
	const [allMembers, setAllMembers] = useState([]);
	const [memberId, setMemberId] = useState({});
	const dateFormat = { year: "numeric", month: "short", day: "numeric" };

	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			setLoggedUser(user);
			// ...
		} else {
			// User is signed out
			// ...
			setLoggedUser(false);
			setSearchedMember(false);
			setAllPayments([]);
			setAllMembers([]);
			setInitialLoad(false);
			setMemberId({});
		}
	});

	async function fetchPayments() {
		const q = query(collection(db, "payment"), orderBy("date", "desc"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			const newData = doc.data();
			newData["id"] = doc.id;
			setAllPayments((prevState) => {
				return [...prevState, newData];
			});
		});
		setGlobalLoading(false);
	}

	async function fetchMembers() {
		const querySnapshot = await getDocs(collection(db, "members"));
		querySnapshot.forEach((doc) => {
			const nameId = doc.id;
			const name = doc.data().name;
			setMemberId((prevState) => {
				const newData = { ...prevState };
				newData[nameId] = name;
				return newData;
			});
			setAllMembers((prevState) => {
				return [...prevState, doc.data()];
			});
		});
	}

	function initialDataFetch() {
		setGlobalLoading(true);
		fetchMembers();
		fetchPayments();
		setInitialLoad(true);
	}

	useEffect(() => {
		if (!initialLoad && loggedUser) {
			if (allMembers.length > 0) {
				return;
			}
			console.log("Initial data request dispatched");
			initialDataFetch();
		}
	}, [loggedUser]);

	const value = {
		allPayments,
		allMembers,
		memberId,
		dateFormat,
		searchedMember,
		setSearchedMember,
		loggedUser,
		setLoggedUser,
		globalLoading,
	};

	return (
		<AuthContext.Provider value={value}>
			<div>{props.children}</div>
		</AuthContext.Provider>
	);
}
