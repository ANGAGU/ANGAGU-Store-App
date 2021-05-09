// Create Token
import api from '..';

export default async (phone, email, password) => {
    try {
        const {data: token} = await api.post(`/customer/signup`, {
            phone,
            email,
            password
      });
        return token;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};