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

export const setAddress = async (recipient, road, detail) => {
    try {
        const {data: token} = await api.post(`/customer/address`,{
            recipient,
            road,
            detail
        });
        
        return token;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};

export const modifyAddress = async (id, recipient, road, detail) => {
    try {
        const {data: token} = await api.put(`/customer/address/${id}`,{
            recipient,
            road,
            detail
        });
        
        return token;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};
export const getDefaultAddress = async () => {
    try {
        const {data: token} = await api.get(`/customer/address/default`);
        return token;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
}

export const setDefaultAddress = async (id) => {
    try {
        const {data: token} = await api.post(`/customer/address/default/${id}`);
        return token;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
}

