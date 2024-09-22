import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../utils/api';
import Calendar from '../components/Calendar'; // Calendar component

export default function FetchSingleVenue() {
	const { id } = useParams(); 
	const [venue, setVenue] = useState(null);
	const [error, setError] = useState(null);
	const [bookedDates, setBookedDates] = useState([]); // State to store booked dates

	useEffect(() => {
		const fetchVenue = async () => {
			try {
				// Fetch the venue and owener
				const data = await getRequest(
					`/holidaze/venues/${id}?_owner=true&_bookings=true`
				);
				setVenue(data.data);

				
				const dates = data.data.bookings.map((booking) => {
					const fromDate = new Date(booking.dateFrom);
					const toDate = new Date(booking.dateTo);
					// Create an array of dates between dateFrom and dateTo
					let dateArray = [];
					for (let d = fromDate; d <= toDate; d.setDate(d.getDate() + 1)) {
						dateArray.push(new Date(d));
					}
					return dateArray;
				});
				
				setBookedDates(dates.flat());
			} catch (error) {
				setError('Failed to fetch venue. Please try again.');
			}
		};
		fetchVenue();
	}, [id]);

	if (error) return <p className="text-danger">{error}</p>;
	if (!venue) return <p>Loading...</p>;

	return (
		<div>
			<h2>{venue.name}</h2>
			<hr></hr>
			<img
				src={venue.media[0]?.url} 
				alt={venue.media[0]?.alt || venue.name} 
				style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
			/>
			<p>
				<b>Address: </b>
				{venue.location.address}, {venue.location.city},{' '}
				{venue.location.country}
			</p>
			<p>
				<b>Price: </b>
				{venue.price} KR
			</p>
			<p>
				<b>Max guests: </b>
				{venue.maxGuests}
			</p>
			<p>
				<b>Rating: </b>
				{venue.rating}
			</p>
			<p>{venue.description}</p>

			<hr />
			{/* Owner's Info Section */}
			{venue.owner && (
				<div
					className=""
					style={{ marginTop: '2px' }}>
					<h6>Venue Owner</h6>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img
							src={venue.owner.avatar.url} // Owner's avatar URL
							alt={venue.owner.avatar.alt || venue.owner.name} 
							style={{
								width: '50px',
								height: '50px',
								borderRadius: '50%',
								marginRight: '10px',
							}}
						/>
						<p style={{ margin: 0 }}>
							<b>{venue.owner.name}</b> {/* Owner's name */}
						</p>
					</div>
				</div>
			)}

			<hr />
			<h4>Unavailable Dates</h4>
			{/* Calendar component and pass bookedDates */}
			<Calendar bookedDates={bookedDates} />
		</div>
	);
}
