/** @format */

import React, { useEffect, useState } from 'react';
import { getRequest } from '../utils/api';
import { Link } from 'react-router-dom';

export default function FetchAllVenues() {
	const [venues, setVenues] = useState([]);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchVenues = async () => {
			try {
				let url = '/holidaze/venues';
				if (searchTerm) {
					url = `/holidaze/venues/search?q=${searchTerm}`;
				}
				const data = await getRequest(url);
				setVenues(data.data);
			} catch (error) {
				setError('Failed to fetch venues. Please try again.');
			}
		};
		fetchVenues();
	}, [searchTerm]);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div>
			<input
				type="text"
				className="form-control mb-3"
				placeholder="Search for venues..."
				value={searchTerm}
				onChange={handleSearchChange}
			/>
			{error && <p className="text-danger">{error}</p>}
			<div className="venue-list">
				{venues.map((venue) => (
					<div
						key={venue.id}
						className="venue-item mb-5">
						{/* Venue Display */}
						<h5>{venue.name}</h5>
						<p>{venue.description}</p>
						<Link to={`/venue/${venue.id}`}>More details</Link>
					</div>
				))}
			</div>
		</div>
	);
}
