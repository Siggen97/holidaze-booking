
import React, { useState } from 'react';
import { postRequest } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function CreateVenue() {
	const [venueData, setVenueData] = useState({
		name: '',
		description: '',
		price: 0, // Ensure this is a number, not a string
		maxGuests: 1, // Ensure this is a number, not a string
		wifi: false,
		parking: false,
		breakfast: false,
		pets: false,
		media: '', // This should be converted to an array of objects
		address: '',
		city: '',
		zip: '',
		country: '',
	});

		const navigate = useNavigate(); // Initialize useNavigate


	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setVenueData({
			...venueData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Ensure media is an array of objects
		const formattedVenueData = {
			name: venueData.name,
			description: venueData.description,
			price: Number(venueData.price), // Convert price to a number
			maxGuests: Number(venueData.maxGuests), // Convert maxGuests to a number
			media: [
				{
					url: venueData.media, // Assuming single media URL
					alt: venueData.name, // Alt text as venue name
				},
			],
			meta: {
				wifi: venueData.wifi,
				parking: venueData.parking,
				breakfast: venueData.breakfast,
				pets: venueData.pets,
			},
			location: {
				address: venueData.address || null, // Optional, send null if not provided
				city: venueData.city || null, // Optional
				zip: venueData.zip || null, // Optional
				country: venueData.country || null, // Optional
				lat: 0, // Assuming you don't have lat/lng, set to 0
				lng: 0,
			},
		};

		try {
			await postRequest('/holidaze/venues', formattedVenueData);
			alert('Venue created successfully!');
			navigate('/my-venues');
		} catch (error) {
			console.error(
				'Error creating venue:',
				error.response?.data || error.message
			);
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
					<label>Address</label>
					<input
						type="text"
						name="address"
						className="form-control"
						value={venueData.address}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label>City</label>
					<input
						type="text"
						name="city"
						className="form-control"
						value={venueData.city}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label>Zip</label>
					<input
						type="text"
						name="zip"
						className="form-control"
						value={venueData.zip}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label>Country</label>
					<input
						type="text"
						name="country"
						className="form-control"
						value={venueData.country}
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
				<div className="form-group">
					<label>
						<input
							type="checkbox"
							name="parking"
							checked={venueData.parking}
							onChange={handleInputChange}
						/>{' '}
						Parking
					</label>
				</div>
				<div className="form-group">
					<label>
						<input
							type="checkbox"
							name="breakfast"
							checked={venueData.breakfast}
							onChange={handleInputChange}
						/>{' '}
						Breakfast
					</label>
				</div>
				<div className="form-group">
					<label>
						<input
							type="checkbox"
							name="pets"
							checked={venueData.pets}
							onChange={handleInputChange}
						/>{' '}
						Pets Allowed
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
