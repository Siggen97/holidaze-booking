
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

const handleSubmit = async (e) => {
	e.preventDefault();
	try {
		const response = await axios.post('https://v2.api.noroff.dev/auth/login', {
			email: formData.email,
			password: formData.password,
		});
		if (response.data) {
			// Store the token and API key in local storage
			localStorage.setItem('accessToken', response.data.data.accessToken);
			localStorage.setItem('userName', response.data.data.name); // Store the user's name

			// Fetch API key
			const apiKeyResponse = await axios.post(
				'https://v2.api.noroff.dev/auth/create-api-key',
				null,
				{
					headers: {
						Authorization: `Bearer ${response.data.data.accessToken}`,
					},
				}
			);
			localStorage.setItem('apiKey', apiKeyResponse.data.data.key);

			navigate('/dashboard');
		}
	} catch (error) {
		setError('Login failed. Please check your credentials and try again.');
	}
};

	return (
		<div className="container mt-3">
			<h2>Login</h2>
			{error && <p className="text-danger">{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					type="submit"
					className="btn btn-primary">
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
