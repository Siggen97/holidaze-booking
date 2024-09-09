

import React from 'react';
import FetchAllVenues from '../components/venues'; // This component fetches and displays all venues

function Home() {
	return (
		<div className="container mt-3">
			<h2>All Venues</h2>
			<FetchAllVenues /> {/* Shows a list of venues */}
		</div>
	);
}

export default Home;
