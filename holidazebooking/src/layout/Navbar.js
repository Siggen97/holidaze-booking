
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function AppNavbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	// Check if user is logged in by checking the accessToken in localStorage
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [isLoggedIn]);

	// Handle logout functionality
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userName');
		localStorage.removeItem('apiKey');
		setIsLoggedIn(false);
		navigate('/');
	};

	return (
		<Navbar
			bg="dark"
			variant="dark"
			expand="lg">
			<Container>
				<Navbar.Brand
					as={Link}
					to="/">
					Holidaze
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link
							as={Link}
							to="/">
							Home
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/venues">
							Venues
						</Nav.Link>

						{/* Conditionally render links based on login status */}
						{isLoggedIn ? (
							<>
								<Nav.Link
									as={Link}
									to="/dashboard">
									Profile
								</Nav.Link>
								<Nav.Link
									as={Link}
									to="/MyBookings">
									My Bookings
								</Nav.Link>
								<Nav.Link
									as={Link}
									to="/my-venues">
									My Venues
								</Nav.Link>
								<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link
									as={Link}
									to="/login">
									Login
								</Nav.Link>
								<Nav.Link
									as={Link}
									to="/register">
									Register
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default AppNavbar;
