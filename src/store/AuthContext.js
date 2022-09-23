import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthContextProvider(props) {
	const [initialLoad, setInitialLoad] = useState(false);
	const [allPayments, setAllPayments] = useState([]);
	const [allMembers, setAllMembers] = useState([]);

	async function fetchPayments() {
		const querySnapshot = await getDocs(collection(db, "payment"));
		querySnapshot.forEach((doc) => {
			setAllPayments((prevState) => {
				return [...prevState, doc.data()];
			});
		});
	}

	async function fetchMembers() {
		const querySnapshot = await getDocs(collection(db, "members"));
		querySnapshot.forEach((doc) => {
			setAllMembers((prevState) => {
				return [...prevState, doc.data()];
			});
		});
	}

	function initialDataFetch() {
		fetchMembers();
		fetchPayments();
		setInitialLoad(true);
	}

	useEffect(() => {
		if (!initialLoad) {
			if (allMembers.length > 0) {
				return;
			}
			console.log("Initial data request dispatched");
			initialDataFetch();
		}
	});

	const value = {
		allPayments,
		allMembers,
	};

	return (
		<AuthContext.Provider value={value}>
			<div>{props.children}</div>
		</AuthContext.Provider>
	);
}
