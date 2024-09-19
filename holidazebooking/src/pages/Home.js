/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRequest } from '../utils/api';

function Home() {
	const [venues, setVenues] = useState([]);
	const [error, setError] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Check if user is logged in
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			setIsLoggedIn(true);
		}
	}, []);

	// Fetch featured venues (e.g., the first 3 venues)
	useEffect(() => {
		const fetchVenues = async () => {
			try {
				const data = await getRequest('/holidaze/venues');
				setVenues(data.data.slice(0, 3)); // Get only the first 3 venues for the featured section
			} catch (error) {
				setError('Failed to fetch venues. Please try again.');
			}
		};
		fetchVenues();
	}, []);

	return (
		<div>
			{/* Hero Section */}
			<section
				className="hero-section text-center text-light py-5"
				style={{ background: '#5a67d8', color: 'white' }}>
				<div className="container">
					<h1 className="display-4">Welcome to Holidaze</h1>
					<p className="lead">
						Book your dream stay at one of our exclusive venues today!
					</p>
					{/* Change the button based on login status */}
					{isLoggedIn ? (
						<Link
							to="/venues"
							className="btn btn-light btn-lg">
							See All Venues
						</Link>
					) : (
						<Link
							to="/login"
							className="btn btn-light btn-lg">
							Sign in to your account
						</Link>
					)}
				</div>
			</section>

			{/* Featured Venues Section */}
			<section className="featured-venues py-5">
				<div className="container">
					<h2 className="text-center mb-4">Featured Venues</h2>
					{error && <p className="text-danger">{error}</p>}
					<div className="row">
						{venues.map((venue) => (
							<div
								key={venue.id}
								className="col-md-4 mb-4">
								<div className="card shadow-sm">
									{venue.media.length > 0 && (
										<img
											className="card-img-top"
											src={venue.media[0].url}
											alt={venue.media[0].alt || venue.name}
											style={{ height: '200px', objectFit: 'cover' }}
										/>
									)}
									<div className="card-body">
										<h5 className="card-title">{venue.name}</h5>
										<p className="card-text">
											{venue.description.slice(0, 100)}...
										</p>
										<Link
											to={`/venue/${venue.id}`}
											className="btn btn-primary">
											View Details
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to action for customers or venue manager */}
			<section className="register-cta py-5 bg-light text-center">
				<div className="container">
					{/* Change the CTA based on login status */}
					{isLoggedIn ? (
						<>
							<h2>Become a Venue Manager</h2>
							<p>
								Would you like to manage your own venues? Become a venue manager
								and start managing bookings for your venues today.
							</p>
							<Link
								to="/dashboard"
								className="btn btn-primary btn-lg">
								Become a Venue Manager
							</Link>
						</>
					) : (
						<>
							<h2>Join Holidaze and Explore Amazing Venues!</h2>
							<p>
								Whether you're looking for a luxurious stay or a cozy getaway,
								Holidaze has the perfect venue for you.
							</p>
							<Link
								to="/register"
								className="btn btn-primary btn-lg">
								Register as a Customer
							</Link>
						</>
					)}
				</div>
			</section>
		</div>
	);
}

export default Home;
