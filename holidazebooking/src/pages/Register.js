
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
		bio: '',
		avatarUrl: '',
		avatarAlt: '',
		bannerUrl: '',
		bannerAlt: '',
		venueManager: false,
	});
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	// Handle input changes
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Clear error on new submit

		// Validate email
		if (!formData.email.endsWith('@stud.noroff.no')) {
			setError('Only emails ending with @stud.noroff.no are allowed.');
			return;
		}

		// Validate password
		if (formData.password.length < 8) {
			setError('Password must be at least 8 characters.');
			return;
		}

		// Build the data to send to the API
		const registrationData = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
			bio: formData.bio || undefined,
			avatar: formData.avatarUrl
				? { url: formData.avatarUrl, alt: formData.avatarAlt || '' }
				: undefined,
			banner: formData.bannerUrl
				? { url: formData.bannerUrl, alt: formData.bannerAlt || '' }
				: undefined,
			venueManager: formData.venueManager,
		};

		try {
			// Make POST request to register the user
			await axios.post(
				'https://v2.api.noroff.dev/auth/register',
				registrationData
			);
			navigate('/login'); // Redirect to login after successful registration
		} catch (error) {
			setError('Failed to register. Please try again.');
		}
	};

	return (
		<div className="container mt-5">
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				{error && <p className="text-danger">{error}</p>}

				<div className="form-group mt-3">
					<label>Name</label>
					<input
						type="text"
						name="name"
						className="form-control"
						onChange={handleChange}
						placeholder="Username"
						required
					/>
				</div>

				<div className="form-group mt-3">
					<label>Email</label>
					<input
						type="email"
						name="email"
						className="form-control"
						onChange={handleChange}
						placeholder="Email"
						required
					/>
				</div>

				<div className="form-group mt-3">
					<label>Password</label>
					<input
						type="password"
						name="password"
						className="form-control"
						onChange={handleChange}
						placeholder="Password (min 8 characters)"
						required
					/>
				</div>

				{/* Optional fields */}
				<div className="form-group mt-3">
					<label>Bio (optional)</label>
					<textarea
						name="bio"
						className="form-control"
						onChange={handleChange}
						placeholder="Tell us about yourself (max 160 characters)"
						maxLength="160"></textarea>
				</div>

				<div className="form-group mt-3">
					<label>Avatar URL (optional)</label>
					<input
						type="url"
						name="avatarUrl"
						className="form-control"
						onChange={handleChange}
						placeholder=""
					/>
				</div>

				<div className="form-group mt-3">
					<label>Avatar Alt Text (optional)</label>
					<input
						type="text"
						name="avatarAlt"
						className="form-control"
						onChange={handleChange}
						placeholder=""
						maxLength="120"
					/>
				</div>

				<div className="form-group mt-3">
					<label>Banner URL (optional)</label>
					<input
						type="url"
						name="bannerUrl"
						className="form-control"
						onChange={handleChange}
						placeholder=""
					/>
				</div>

				<div className="form-group mt-3">
					<label>Banner Alt Text (optional)</label>
					<input
						type="text"
						name="bannerAlt"
						className="form-control"
						onChange={handleChange}
						placeholder=""
						maxLength="120"
					/>
				</div>

				{/* Venue Manager Checkbox */}
				<div className="form-check mt-3">
					<input
						type="checkbox"
						name="venueManager"
						className="form-check-input"
						checked={formData.venueManager}
						onChange={handleChange}
					/>
					<label className="form-check-label">
						I want to become a Venue Manager
					</label>
				</div>

				<button
					type="submit"
					className="btn btn-primary mt-3 mb-3"
					id="holidazeBTN">
					Register
				</button>
			</form>
		</div>
	);
}
