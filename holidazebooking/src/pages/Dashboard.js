
import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../utils/api';

function Dashboard() {
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getUserData = async () => {
			try {
				const data = await fetchUserProfile();
				setUserData(data.data);
			} catch (error) {
				setError('Failed to fetch user data. Please try again.');
			}
		};

		getUserData();
	}, []);

	return (
		<div className="container mt-3">
			<h2>User Dashboard</h2>
			{error && <p className="text-danger">{error}</p>}
			{userData ? (
				<div>
					<p>
						<strong>Name:</strong> {userData.name}
					</p>
					<p>
						<strong>Email:</strong> {userData.email}
					</p>
					<p>
						<strong>Bio:</strong> {userData.bio}
					</p>
					<div>
						<img
							src={userData.avatar.url}
							alt={userData.avatar.alt}
							style={{ width: '100px' }}
						/>
						<img
							src={userData.banner.url}
							alt={userData.banner.alt}
							style={{ width: '100%' }}
						/>
					</div>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	);
}

export default Dashboard;
