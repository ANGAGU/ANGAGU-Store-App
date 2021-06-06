// Create Token
import api from '..';

export const getReview = async (id) => {
    try {
        let endPoint = `/customer/products/${id}`
        
        const {data: product} = await api.get(endPoint);
        return product;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};