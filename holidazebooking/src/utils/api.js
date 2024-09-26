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

// Function to handle non-authenticated GET requests (for venues, etc.)
export const getPublicRequest = async (endpoint) => {
	try {
		const response = await axios.get(`${API_BASE_URL}${endpoint}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching public data:', error);
		throw error;
	}
};

// Function to handle authenticated GET requests (for user-specific data)
export const getRequest = async (endpoint) => {
	try {
		const response = await axios.get(`${API_BASE_URL}${endpoint}`, getAuthHeaders());
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

// Fetch public venues (no authentication required)
export const getVenues = async () => {
	return await getPublicRequest('/holidaze/venues');
};

// Fetch a single venue (no authentication required)
export const getSingleVenue = async (id) => {
	try {
		// Append query parameters to get owner and bookings data
		const response = await axios.get(
			`${API_BASE_URL}/holidaze/venues/${id}?_owner=true&_bookings=true`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching single venue:', error);
		throw error;
	}
};

// Fetch user profile data (requires authentication)
export const fetchUserProfile = async () => {
	const userName = localStorage.getItem('userName'); 
	if (!userName) {
		throw new Error('User name is missing from local storage.');
	}
	return await getRequest(`/holidaze/profiles/${userName}`);
};

// Function to create a new booking
export const createBooking = async (bookingData) => {
	return await postRequest('/bookings', bookingData);
};


