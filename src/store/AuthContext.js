import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
	collection,
	getDocs,
	query,
	orderBy,
	onSnapshot,
} from "firebase/firestore";
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthContextProvider(props) {
	const [initialLoad, setInitialLoad] = useState(false);
	const [globalLoading, setGlobalLoading] = useState(false);
	const [searchedMember, setSearchedMember] = useState(false);
	const [loggedUser, setLoggedUser] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [allPayments, setAllPayments] = useState([]);
	const [allMembers, setAllMembers] = useState([]);
	const [memberId, setMemberId] = useState({});
	const dateFormat = { year: "numeric", month: "short", day: "numeric" };
	const planAmounts = {
		1: 1000,
		4: 3000,
		6: 5000,
		12: 8000,
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setLoggedUser(user);
		} else {
			setLoggedUser(false);
			setSearchedMember(false);
			setAllPayments([]);
			setAllMembers([]);
			setInitialLoad(false);
			setMemberId({});
		}
	});

	useEffect(() => {
		if (!initialLoad && loggedUser) {
			if (allMembers.length > 0) {
				return;
			}
			setGlobalLoading(true);
			const q = collection(db, "members");
			setAllMembers([]);
			const unsubMembers = onSnapshot(q, (querySnapshot) => {
				setAllMembers([]);
				setMemberId([]);
				querySnapshot.forEach((doc) => {
					const nameId = doc.id;
					const name = doc.data().name;
					setMemberId((prevState) => {
						const newData = { ...prevState };
						newData[nameId] = name;
						return newData;
					});
					const newData = doc.data();
					newData["id"] = doc.id;
					setAllMembers((prevState) => {
						return [...prevState, newData];
					});
				});
			});
			const q2 = query(collection(db, "payment"), orderBy("date", "desc"));
			const unsubPayments = onSnapshot(q2, (querySnapshot) => {
				setAllPayments([]);
				querySnapshot.forEach((doc) => {
					const newData = doc.data();
					newData["id"] = doc.id;
					setAllPayments((prevState) => {
						return [...prevState, newData];
					});
				});
				setGlobalLoading(false);
			});

			console.log("Initial data request dispatched");
			// initialDataFetch();
			return () => {
				unsubMembers();
				unsubPayments();
			};
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
		planAmounts,
		refresh,
	};

	return (
		<AuthContext.Provider value={value}>
			<div>{props.children}</div>
		</AuthContext.Provider>
	);
}
