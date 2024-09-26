import React, { useEffect, useState } from 'react';
import { getRequest, deleteRequest } from '../utils/api'; // Importing the GET request function
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
				// Fetch all bookings for the current user profile, including venue details
				const data = await getRequest(
					`/holidaze/profiles/${userName}/bookings?_venue=true`
				);
				setBookings(data.data); // Assuming bookings with venue info are returned in data.data
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

		const handleDelete = async (bookingId) => {
			if (window.confirm('Are you sure you want to delete this booking?')) {
				try {
					await deleteRequest(`/holidaze/bookings/${bookingId}`);
					alert('Booking deleted successfully!');
					setBookings(bookings.filter((booking) => booking.id !== bookingId)); // Remove from state
				} catch (error) {
					setError('Failed to delete booking.');
				}
			}
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
							{/* Delete Button */}
							<button
								className="btn btn-danger mx-2"
								onClick={() => handleDelete(booking.id)}>
								Delete
							</button>

							{/* Conditionally render the View Details button if venue exists */}
							{booking.venue && booking.venue.id ? (
								<Link
									to={`/venue/${booking.venue.id}`} // Dynamically link to venue page
									className="btn btn-primary">
									View Details
								</Link>
							) : (
								<p className="text-muted">Venue details unavailable.</p>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
