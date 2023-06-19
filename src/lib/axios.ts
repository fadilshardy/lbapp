import { API_URL } from '@config';
import Axios from 'axios';

const axios = Axios.create({
    baseURL: API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

// const setCSRFTokenInterceptor = async (config) => {
//     await retrieveCSRFToken();
//     return config;
// };

// axios.interceptors.request.use(setCSRFTokenInterceptor);

// async function retrieveCSRFToken() {
//     await axios.get('/sanctum/csrf-cookie');
// }

axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;
        // useNotificationStore.getState().addNotification({
        //     type: 'error',
        //     title: 'Error',
        //     message,
        // });
        return Promise.reject(error);
    }
);

export default axios;


