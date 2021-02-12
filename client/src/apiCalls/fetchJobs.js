import axios from 'axios';

const JOB_API_URL = "/api/jobs";

// call API jobs.
export const fetchJobs = async (updateList) => {
	const response = await axios.get(JOB_API_URL);
	const data = response.data;
	updateList(data);
}