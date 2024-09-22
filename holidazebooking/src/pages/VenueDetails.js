/** @format */

import React from 'react';
import FetchSingleVenue from '../components/singleVenue'; // Component to fetch and display venue details
import BookingForm from '../components/bookingForm'; // Component to handle booking

function VenueDetails() {
	return (
		<div className="container">
			<FetchSingleVenue />
			<hr />
			<h3>Book this Venue</h3>
			<BookingForm /> {/* This will handle the booking and price calculation */}
		</div>
	);
}

export default VenueDetails;
