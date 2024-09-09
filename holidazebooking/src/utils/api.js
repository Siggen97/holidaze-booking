import axios from 'axios';

const API_BASE_URL = 'https://v2.api.noroff.dev';

// Function to get the headers with authentication
const getAuthHeaders = () => {
	const accessToken = localStorage.getItem('accessToken');
	const apiKey = localStorage.getItem('apiKey');

	if (!accessToken || !apiKey) {
		throw new Error('Authentication credentials are missing.');
	}

	return {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'X-Noroff-API-Key': apiKey,
		},
	};
};

// Function to handle GET requests
export const getRequest = async (endpoint) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}${endpoint}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

// Function to handle POST requests
export const postRequest = async (endpoint, data) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}${endpoint}`,
			data,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error('Error posting data:', error);
		throw error;
	}
};

// Function to handle PUT requests
export const putRequest = async (endpoint, data) => {
	try {
		const response = await axios.put(
			`${API_BASE_URL}${endpoint}`,
			data,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error('Error updating data:', error);
		throw error;
	}
};

// Function to handle DELETE requests
export const deleteRequest = async (endpoint) => {
	try {
		const response = await axios.delete(
			`${API_BASE_URL}${endpoint}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting data:', error);
		throw error;
	}
};

// Fetch user profile data
export const fetchUserProfile = async () => {
	const userName = localStorage.getItem('userName'); // Assuming the user's name is stored in local storage after login
	if (!userName) {
		throw new Error('User name is missing from local storage.');
	}
	return await getRequest(`/holidaze/profiles/${userName}`);
};

// Function to create a new booking
export const createBooking = async (bookingData) => {
	return await postRequest('/bookings', bookingData);
};


