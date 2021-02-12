import axios from 'axios';

const SPAM_API_URL = "/api/countspam";

// call API jobs.
export const spamCount = async (data) => {
	const response = await axios.post(SPAM_API_URL, data);
    return response;
}