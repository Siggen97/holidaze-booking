
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../utils/api';

export default function FetchSingleVenue() {
	// Change name from SingleVenue to FetchSingleVenue
	const { id } = useParams(); // Extract the venue ID from the URL
	const [venue, setVenue] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchVenue = async () => {
			try {
				const data = await getRequest(`/holidaze/venues/${id}`);
				setVenue(data.data);
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
			<img
				src={venue.media[0].url} // Display the first image from the media array
				alt={venue.media[0].alt || venue.name} // Use the alt text or fallback to venue name
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
			<p>{venue.description}</p>
			</p>
			<hr></hr>
			<h4>Available Dates</h4>
			{/* Render calendar logic here */}
		</div>
	);
}
