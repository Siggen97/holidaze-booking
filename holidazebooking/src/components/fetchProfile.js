import { fetchUserProfile } from './utils/api';

const fetchProfile = async () => {
	try {
		const profile = await fetchUserProfile();
		console.log(profile);
	} catch (error) {
		console.error('Failed to fetch user profile:', error);
	}
};

fetchProfile();
