
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VenueDetails from './pages/VenueDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppNavbar from './layout/Navbar';
import AppFooter from './layout/Footer';

function App() {
	return (
		<Router>
			<div className="App">
				<AppNavbar />
				<div className="container mt-3">
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/venue/:id"
							element={<VenueDetails />}
						/>
						<Route
							path="/booking/:id"
							element={<Booking />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						/>
					</Routes>
				</div>
				<AppFooter />
			</div>
		</Router>
	);
}

export default App;
