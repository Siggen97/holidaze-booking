
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postRequest, getRequest } from '../utils/api'; // Import the GET and POST request handlers

export default function BookingForm() {
	const { id } = useParams(); // Venue ID from the URL
	const [dates, setDates] = useState({ dateFrom: '', dateTo: '' });
	const [guests, setGuests] = useState(1); // Default to 1 guest
	const [pricePerNight, setPricePerNight] = useState(0); // Store price per night
	const [totalPrice, setTotalPrice] = useState(0); // Total calculated price
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	// Fetch the venue details (including price) when the component mounts
	useEffect(() => {
		const fetchVenueDetails = async () => {
			try {
				const venueData = await getRequest(`/holidaze/venues/${id}`);
				setPricePerNight(venueData.data.price); // Set the price per night from the API response
			} catch (error) {
				setError('Failed to fetch venue details.');
			}
		};
		fetchVenueDetails();
	}, [id]);

	// Calculate total price when dates change
	useEffect(() => {
		if (dates.dateFrom && dates.dateTo) {
			const fromDate = new Date(dates.dateFrom);
			const toDate = new Date(dates.dateTo);
			const diffInTime = toDate.getTime() - fromDate.getTime();
			const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // Difference in days
			setTotalPrice(diffInDays * pricePerNight); // Total price = number of nights * price per night
		}
	}, [dates, pricePerNight]);

	const handleBooking = async (e) => {
		e.preventDefault();
		try {
			const bookingData = {
				dateFrom: dates.dateFrom,
				dateTo: dates.dateTo,
				guests: parseInt(guests, 10), // Ensure guests is an integer
				venueId: id,
			};

			// Log the data being sent
			console.log('Booking data being sent:', bookingData);

			// Post booking data
			await postRequest('/holidaze/bookings', bookingData);
			setSuccess(true);
		} catch (error) {
			// Log full error response for debugging
			console.error('Booking failed:', error.response?.data || error.message);
			setError('Failed to book the venue. Please try again.');
		}
	};

	return (
		<div>
			{error && <p className="text-danger">{error}</p>}
			{success && <p className="text-success">Booking successful!</p>}
			{!success && (
				<form onSubmit={handleBooking}>
					<div className="form-group">
						<label htmlFor="dateFrom">Start Date</label>
						<input
							className="form-control mb-2"
							type="date"
							name="dateFrom"
							id="dateFrom"
							value={dates.dateFrom}
							onChange={(e) => setDates({ ...dates, dateFrom: e.target.value })}
							required
						/>
						<label htmlFor="dateTo">End Date</label>
						<input
							className="form-control mb-2"
							type="date"
							name="dateTo"
							id="dateTo"
							value={dates.dateTo}
							onChange={(e) => setDates({ ...dates, dateTo: e.target.value })}
							required
						/>
						<label htmlFor="numberGuests">Guests</label>
						<input
							className="form-control mb-2"
							type="number"
							name="guests"
							id="numberGuests"
							value={guests}
							onChange={(e) => setGuests(e.target.value)}
							min={1}
							required
						/>
						{dates.dateFrom && dates.dateTo && (
							<p>Total Price: ${totalPrice.toFixed(2)}</p> // Ensure price is displayed with 2 decimal points
						)}
						<button
							type="submit"
							className="btn btn-primary"
							id="holidazeBTN">
							Book Venue
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
