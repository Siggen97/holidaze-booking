
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function AppNavbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if the user is logged in by checking localStorage
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const handleLogout = () => {
		// Clear localStorage
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
					<Nav className="me-auto">
						<Nav.Link
							as={Link}
							to="/">
							Home
						</Nav.Link>
						{isLoggedIn ? (
							<>
								<Nav.Link
									as={Link}
									to="/dashboard">
									Dashboard
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
