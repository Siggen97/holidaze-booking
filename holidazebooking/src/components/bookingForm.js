
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { postRequest } from '../utils/api'; // Import your POST request handler

export default function BookingForm() {
	const { id } = useParams();
	const [dates, setDates] = useState({ dateFrom: '', dateTo: '' });
	const [guests, setGuests] = useState(1);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleBooking = async (e) => {
		e.preventDefault();
		try {
			const bookingData = {
				dateFrom: dates.dateFrom,
				dateTo: dates.dateTo,
				guests,
				venueId: id,
			};
			await postRequest('/holidaze/bookings', bookingData);
			setSuccess(true);
		} catch (error) {
			setError('Failed to book the venue. Please try again.');
		}
	};

	return (
		<div>
			{error && <p className="text-danger">{error}</p>}
			{success && <p className="text-success">Booking successful!</p>}
			<form onSubmit={handleBooking}>
				<input
					type="date"
					name="dateFrom"
					onChange={(e) => setDates({ ...dates, dateFrom: e.target.value })}
					required
				/>
				<input
					type="date"
					name="dateTo"
					onChange={(e) => setDates({ ...dates, dateTo: e.target.value })}
					required
				/>
				<input
					type="number"
					name="guests"
					onChange={(e) => setGuests(e.target.value)}
					value={guests}
					min={1}
					required
				/>
				<button type="submit">Book Venue</button>
			</form>
		</div>
	);
}
