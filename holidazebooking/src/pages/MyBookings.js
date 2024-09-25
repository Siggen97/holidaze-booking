import React, { useEffect, useState } from 'react';
import { getRequest } from '../utils/api'; // Importing the GET request function
import { Link } from 'react-router-dom';

export default function MyBookings() {
	const [bookings, setBookings] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch the user's name from localStorage
	const userName = localStorage.getItem('userName');

	useEffect(() => {
		const fetchMyBookings = async () => {
			try {
				// Fetch all bookings for the current user profile
				const data = await getRequest(
					`/holidaze/profiles/${userName}/bookings`
				);
				setBookings(data.data);
			} catch (error) {
				setError('Failed to fetch your bookings. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchMyBookings();
	}, [userName]);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	if (loading) {
		return <p>Loading your bookings...</p>;
	}

	if (error) {
		return <p className="text-danger">{error}</p>;
	}

	return (
		<div className="container mt-5">
			<h2>My Bookings</h2>
			{bookings.length === 0 ? (
				<p>No bookings found.</p>
			) : (
				<div className="booking-list">
					{bookings.map((booking) => (
						<div
							key={booking.id}
							className="booking-item mb-4 p-3 border rounded">
							<h5>Booking ID: {booking.id}</h5>
							<p>
								<strong>From:</strong> {formatDate(booking.dateFrom)}
							</p>
							<p>
								<strong>To:</strong> {formatDate(booking.dateTo)}
							</p>
							<p>
								<strong>Guests:</strong> {booking.guests}
							</p>
							<p>
								<strong>Created:</strong> {formatDate(booking.created)}
							</p>
							<Link
								className="App-link btn btn-info"
								to={`/venue/${booking.venueId}`}>
								View Venue Details
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
}