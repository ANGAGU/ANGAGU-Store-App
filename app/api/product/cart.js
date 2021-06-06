// Create Token
import api from '..';

export const getCart = async () => {
    try {
        let endPoint = `/customer/cart`
        
        const {data: cart} = await api.get(endPoint);
        return cart;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};

export const addCart = async (productId) => {
    try {
        let endPoint = `/customer/cart`
        
        const {data: cart} = await api.post(endPoint, {productId});
        return cart;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};

export const delCart = async (productId) => {
    try {
        let endPoint = `/customer/cart/${productId}`
        
        const {data: cart} = await api.delete(endPoint);
        return cart;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};