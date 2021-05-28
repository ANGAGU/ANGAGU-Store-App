// Create Token
import api from '..';

export const getAddress = async () => {
    try {
        const {data: token} = await api.get(`/customer/address`);
        
        return token;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};

