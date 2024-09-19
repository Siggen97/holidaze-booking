import React from 'react';
import FetchAllVenues from '../components/venues'; 


function Venues() {
	return (
		<div className="container">
			<h3 className='mb-5'>Find your dream venue and book your next holiday</h3>
			<FetchAllVenues />
			<hr />

		</div>
	);
}

export default Venues;
