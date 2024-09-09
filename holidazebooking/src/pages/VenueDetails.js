
import React from 'react';
import FetchSingleVenue from '../components/singleVenue'; // Named import for venue details
import BookingForm from '../components/bookingForm'; // Import Booking Form

function VenueDetails() {
	return (
		<div className="container mt-5">
			<FetchSingleVenue />
			<hr />
			<h3>Book this Venue</h3>
			<BookingForm /> 
		</div>
	);
}

export default VenueDetails;
