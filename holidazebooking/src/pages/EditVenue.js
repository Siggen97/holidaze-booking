
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequest, putRequest } from '../utils/api';

export default function EditVenue() {
	const { id } = useParams();
	const [venueData, setVenueData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchVenue = async () => {
			try {
				const data = await getRequest(`/holidaze/venues/${id}`);
				setVenueData(data.data);
			} catch (error) {
				setError('Failed to fetch venue details.');
			} finally {
				setLoading(false);
			}
		};
		fetchVenue();
	}, [id]);



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
			const formattedVenueData = {
				name: venueData.name,
				description: venueData.description,
				price: Number(venueData.price), // Ensure this is a number
				maxGuests: Number(venueData.maxGuests), // Ensure this is a number
				media: [
					{
						url: venueData.media[0]?.url || '', // Make sure this is an array
						alt: venueData.name || 'venue image',
					},
				],
				meta: {
					wifi: venueData.meta.wifi || false,
					parking: venueData.meta.parking || false,
					breakfast: venueData.meta.breakfast || false,
					pets: venueData.meta.pets || false,
				},
				location: {
					address: venueData.location.address || null,
					city: venueData.location.city || null,
					zip: venueData.location.zip || null,
					country: venueData.location.country || null,
					lat: 0, // You can set default lat/lng if missing
					lng: 0,
				},
			};
			// PUT request to update the venue
			await putRequest(`/holidaze/venues/${id}`, formattedVenueData);
			alert('Venue updated successfully!');
			navigate('/my-venues');
		} catch (error) {
			console.error(
				'Error updating venue:',
				error.response?.data || error.message
			);
			alert('Failed to update venue.');
		}
	};

	if (loading) {
		return <p>Loading venue details...</p>;
	}

	if (error) {
		return <p className="text-danger">{error}</p>;
	}

	return (
		<div className="container mt-5">
			<h2>Edit Venue</h2>
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
						value={venueData.media[0]?.url || ''}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label>
						<input
							type="checkbox"
							name="wifi"
							checked={venueData.meta.wifi || false}
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
							checked={venueData.meta.parking || false}
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
							checked={venueData.meta.breakfast || false}
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
							checked={venueData.meta.pets || false}
							onChange={handleInputChange}
						/>{' '}
						Pets Allowed
					</label>
				</div>
				<button
					type="submit"
					className="btn btn-primary">
					Update Venue
				</button>
			</form>
		</div>
	);
}
