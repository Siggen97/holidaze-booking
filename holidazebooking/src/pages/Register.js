
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!formData.email.endsWith('@stud.noroff.no')) {
				setError('Only emails ending with @stud.noroff.no are allowed.');
				return;
			}

			await axios.post('https://v2.api.noroff.dev/auth/register', formData);
			navigate('/login');
		} catch (error) {
			setError('Failed to register. Please try again.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{error && <p className="text-danger">{error}</p>}
			<input
				type="text"
				name="name"
				onChange={handleChange}
				placeholder="Name"
				required
			/>
			<input
				type="email"
				name="email"
				onChange={handleChange}
				placeholder="Email"
				required
			/>
			<input
				type="password"
				name="password"
				onChange={handleChange}
				placeholder="Password"
				required
			/>
			<button type="submit">Register</button>
		</form>
	);
}
