import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthContextProvider(props) {
	const [initialPaymentsFetched, setInitialPaymentsFetched] = useState(false);

	const value = {
		initialPaymentsFetched,
		setInitialPaymentsFetched,
	};

	return (
		<AuthContext.Provider value={value}>
			<div>{props.children}</div>
		</AuthContext.Provider>
	);
}
