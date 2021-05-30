// Create Token
import api from '..';

export default async (email, password) => {
    try {
        const {data: token} = await api.post(`/customer/login`, {
            email,
            password
        });
        api.defaults.headers.common.Authorization = token.token;
        
        return token;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};