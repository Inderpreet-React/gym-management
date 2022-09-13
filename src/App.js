import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/dashboard" element={<DashBoardPage />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
