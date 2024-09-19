
import React, { useState } from 'react';
import { postRequest } from '../utils/api';

export default function CreateVenue() {
	const [venueData, setVenueData] = useState({
		name: '',
		description: '',
		price: 0,
		maxGuests: 1,
		wifi: false,
		parking: false,
		breakfast: false,
		pets: false,
		media: '',
	});

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setVenueData({
			...venueData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await postRequest('/holidaze/venues', venueData);
			alert('Venue created successfully!');
		} catch (error) {
			alert('Failed to create venue. Please try again.');
		}
	};

	return (
		<div className="container mt-5">
			<h2>Create a New Venue</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input
						type="text"
						name="name"
						className="form-control"
						value={venueData.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea
						name="description"
						className="form-control"
						value={venueData.description}
						onChange={handleInputChange}
						required></textarea>
				</div>
				<div className="form-group">
					<label>Price</label>
					<input
						type="number"
						name="price"
						className="form-control"
						value={venueData.price}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Max Guests</label>
					<input
						type="number"
						name="maxGuests"
						className="form-control"
						value={venueData.maxGuests}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Media URL</label>
					<input
						type="url"
						name="media"
						className="form-control"
						value={venueData.media}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label>
						<input
							type="checkbox"
							name="wifi"
							checked={venueData.wifi}
							onChange={handleInputChange}
						/>{' '}
						Wifi
					</label>
				</div>
				<button
					type="submit"
					className="btn btn-primary">
					Create Venue
				</button>
			</form>
		</div>
	);
}
