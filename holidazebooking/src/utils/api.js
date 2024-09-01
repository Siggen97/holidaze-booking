import axios from 'axios';

const API_BASE_URL = 'https://api.noroff.dev/api/v1/holidaze';

export const getVenues = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/venues`);
		return response.data;
	} catch (error) {
		console.error('Error fetching venues', error);
		throw error;
	}
};

export const getVenueDetails = async (id) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/venues/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching venue details', error);
		throw error;
	}
};

