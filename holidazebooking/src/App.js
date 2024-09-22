import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import Home from './pages/Home';
import VenueDetails from './pages/VenueDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppNavbar from './layout/Navbar';
import AppFooter from './layout/Footer';
import CreateVenue from './pages/CreateVenue';
import Venues from './pages/Venues';
import MyBookings from './pages/MyBookings';
import MyVenues from './pages/MyVenues';

function App() {


	return (
		<div className="App">
			<Router>
				<AppNavbar />
				<div className="container mt-3">
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/venues"
							element={<Venues />}
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
						<Route
							path="/MyBookings"
							element={<MyBookings />}
						/>
						<Route
							path="/MyVenues"
							element={<MyVenues />}
						/>
						<Route
							path="/create-venue"
							element={<CreateVenue />}
						/>
					</Routes>
				</div>
				<AppFooter />
			</Router>
		</div>
	);
}

export default App;
