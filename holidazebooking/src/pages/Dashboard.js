/** @format */
import React, { useState, useEffect } from 'react';
import { getRequest, putRequest } from '../utils/api'; // Import your request handlers
import { Link } from 'react-router-dom';

export default function Profile() {
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);
	const [newAvatarUrl, setNewAvatarUrl] = useState('');
	const [avatarUpdated, setAvatarUpdated] = useState(false);
	const [isVenueManager, setIsVenueManager] = useState(false);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const userName = localStorage.getItem('userName'); // Assuming userName is stored on login
				const data = await getRequest(`/holidaze/profiles/${userName}`);
				setUserData(data.data);
				setIsVenueManager(data.data.venueManager);
			} catch (error) {
				setError('Failed to fetch user data. Please try again.');
			}
		};
		fetchProfile();
	}, []);

	// Handle avatar update
	const handleAvatarUpdate = async () => {
		try {
			const userName = localStorage.getItem('userName');
			await putRequest(`/holidaze/profiles/${userName}`, {
				avatar: { url: newAvatarUrl },
			});
			setAvatarUpdated(true);
		} catch (error) {
			setError('Failed to update avatar. Please try again.');
		}
	};

	if (error) return <p className="text-danger">{error}</p>;
	if (!userData) return <p>Loading...</p>;

	return (
		<div className="container mt-5">
			<div className="profile-banner text-center">
				<img
					src={userData.banner.url}
					alt={userData.banner.alt}
					className="img-fluid mb-3"
					style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
				/>
			</div>

			<div className="row">
				<div className="col-md-4 text-center">
					<img
						src={userData.avatar.url}
						alt={userData.avatar.alt}
						className="rounded-circle mb-3"
						style={{ width: '150px', height: '150px', objectFit: 'cover' }}
					/>
					<h4>{userData.name}</h4>
					<p>{userData.email}</p>
				</div>

				<div className="col-md-8">
					<h5>User Bio</h5>
					<p>{userData.bio}</p>

					<hr />

					{/* Avatar Update Section */}
					<div>
						<h5>Update Avatar</h5>
						<input
							type="url"
							placeholder="Enter new avatar URL"
							className="form-control mb-2"
							value={newAvatarUrl}
							onChange={(e) => setNewAvatarUrl(e.target.value)}
						/>
						<button
							className="btn btn-primary"
							onClick={handleAvatarUpdate}>
							Update Avatar
						</button>
						{avatarUpdated && (
							<p className="text-success mt-2">Avatar updated successfully!</p>
						)}
					</div>

					<hr />

					{/* Venue Manager Section */}
					{isVenueManager ? (
						<div>
							<h5>Venue Manager Options</h5>
							<Link
								to="/create-venue"
								className="btn btn-success mb-2">
								Create New Venue
							</Link>
							<Link
								to="/manage-venues"
								className="btn btn-info mb-2">
								Manage Venues
							</Link>
							<Link
								to="/view-bookings"
								className="btn btn-warning mb-2">
								View Bookings
							</Link>
						</div>
					) : (
						<div>
							<h5>Become a Venue Manager</h5>
							<p>
								Would you like to manage venues? Click below to become a venue
								manager.
							</p>
							<button
								className="btn btn-primary"
								onClick={async () => {
									try {
										const userName = localStorage.getItem('userName');
										await putRequest(`/holidaze/profiles/${userName}`, {
											venueManager: true,
										});
										setIsVenueManager(true);
									} catch (error) {
										setError(
											'Failed to update venue manager status. Please try again.'
										);
									}
								}}>
								Become a Venue Manager
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
