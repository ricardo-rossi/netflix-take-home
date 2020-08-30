import axios from 'axios';

/**
 * Creates an axios instance and default configuration
 *
 * @type {AxiosInstance}
 */
const httpClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;