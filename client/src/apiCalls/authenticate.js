import axios from 'axios';

// base api url's
const AUTH_REGISTER_URL = "/api/register";
const AUTH_LOGIN_URL = "/api/login";

// sign up call to server
export const register = async (data) => {    
    const response = await axios.post(AUTH_REGISTER_URL,data);
    return response;
};

// login call to server
export const login = async (data) => {    
    const response = await axios.post(AUTH_LOGIN_URL,data);
    return response;
};