import axios from 'axios';

const API_URL = 'http://8.218.83.35:80/api/logout';

export const logout = async () => {
    try {
        const response = await axios.post(API_URL, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            localStorage.removeItem('token'); 
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            console.log('Logout successful!');
            return true;
        }
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        return false;
    }
};
