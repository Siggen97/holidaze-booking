import React, { useEffect, useState } from 'react';
import { getVenues } from '../utils/api';

function Home() {
	const [venues, setVenues] = useState([]);

	useEffect(() => {
		const fetchVenues = async () => {
			try {
				const data = await getVenues();
				setVenues(data);
			} catch (error) {
				console.error('Error fetching venues', error);
			}
		};

		fetchVenues();
	}, []);

	return (
		<div>
			<h1>Venues</h1>
			<ul>
				{venues.map((venue) => (
					<li key={venue.id}>{venue.name}</li>
				))}
			</ul>
		</div>
	);
}

export default Home;
