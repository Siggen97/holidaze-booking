
import React, { useEffect, useState } from 'react';
import { getRequest, deleteRequest } from '../utils/api'; // Import the GET request function
import { Link } from 'react-router-dom';

export default function MyVenues() {
	const [venues, setVenues] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	

	// Fetch the user's name from localStorage
	const userName = localStorage.getItem('userName');

	useEffect(() => {
		const fetchMyVenues = async () => {
			try {
				// Fetch all venues created by the current user
				const data = await getRequest(`/holidaze/profiles/${userName}/venues?_bookings=true`);
				setVenues(data.data);
			} catch (error) {
				setError('Failed to fetch your venues. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchMyVenues();
	}, [userName]);

	const handleDelete = async (venueId) => {
		if (window.confirm('Are you sure you want to delete this venue?')) {
			try {
				await deleteRequest(`/holidaze/venues/${venueId}`);
				// Remove the deleted venue from the state
				setVenues(venues.filter((venue) => venue.id !== venueId));
			} catch (error) {
				alert('Failed to delete the venue. Please try again.');
			}
		}
	};

		const formatDate = (dateString) => {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		};

	if (loading) {
		return <p>Loading your venues...</p>;
	}

	if (error) {
		return <p className="text-danger">{error}</p>;
	}

	return (
		<div className="container mt-5">
			<h2>My Venues</h2>
			{venues.length === 0 ? (
				<p>You haven't created any venues yet.</p>
			) : (
				<div className="venue-list">
					{venues.map((venue) => (
						<div
							key={venue.id}
							className="venue-item mb-5 p-3 border rounded">
							{/* venue details */}
							{venue.media.length > 0 && (
								<img
									className="card-img-top"
									src={venue.media[0].url}
									alt={venue.media[0].alt || venue.name}
									style={{ height: '200px', objectFit: 'cover' }}
								/>
							)}
							<h5>{venue.name}</h5>
							<p>{venue.description}</p>
							<p>
								<strong>Price:</strong> ${venue.price}
							</p>
							<p>
								<strong>Max Guests:</strong> {venue.maxGuests}
							</p>
							{/* bookings for the venue */}
							{venue.bookings && venue.bookings.length > 0 ? (
								<div className="mt-3">
									<h6>Bookings for this venue:</h6>
									<ul>
										{venue.bookings.map((booking) => (
											<li
												key={booking.id}
												className="mb-2">
												<p>
													<strong>Customer Name:</strong>{' '}
													{booking.customer.name}
												</p>
												<p>
													<strong>Guests:</strong> {booking.guests}
												</p>
												<p>
													<strong>From:</strong> {formatDate(booking.dateFrom)}{' '}
													-<strong> To:</strong> {formatDate(booking.dateTo)}
												</p>
												
											</li>
										))}
									</ul>
								</div>
							) : (
								<p>No bookings for this venue yet.</p>
							)}
							<Link
								className="App-link btn btn-info"
								to={`/venue/${venue.id}`}
								id="holidazeBTN">
								View Venue Details
							</Link>
							<Link
								to={`/edit-venue/${venue.id}`} // Navigate to the EditVenue.js page with venue ID
								className="btn btn-warning mx-2">
								Edit
							</Link>
							<button
								className="btn btn-danger"
								onClick={() => handleDelete(venue.id)}>
								Delete
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
