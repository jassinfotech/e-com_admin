import axios from 'axios';
//https://backend.shivayastrogems.com/ live
//http://localhost:8000 local
const BASE_URL = 'https://backend.shivayastrogems.com';

const setAuthToken = (token) => {
  console.log("token----------------", token)
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

};

const handleTokenExpiration = (error) => {
  if (error.response && error.response.status === 401) {
    console.log('Token has expired. Redirecting to login page.');
    window.location.href = 'login';
  }
  throw error;
};

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return handleTokenExpiration(error);
});

const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { setAuthToken, postData, getData, BASE_URL };
