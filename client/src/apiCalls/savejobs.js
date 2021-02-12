import axios from 'axios';

const SAVEJOB_API_URL = "/api/savejobs";
const CHECKJOB_API_URL = "/api/checksaved";
const SAVED_API_URL = "/api/getsaved";

// call API jobs.
export const saveJobs = async (data) => {
	const response = await axios.post(SAVEJOB_API_URL, data);
    return response;
}

export const checkIfSaved = async (data) => {
	const response = await axios.post(CHECKJOB_API_URL, data);
    return response;
}

export const getSaved = async (data) => {
	const response = await axios.post(SAVED_API_URL, data);
    return response;
}