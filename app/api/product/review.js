// Create Token
import api from '..';

export const getReview = async (id) => {
    try {
        let endPoint = `/customer/order/${id}/review`
        
        const {data: product} = await api.get(endPoint);
        return product;
    } catch (error) {
        return error.response;
    }
};

export const setReview = async (id, star, content) => {
    try {
        let endPoint = `/customer/order/${id}/review`
        
        const {data: product} = await api.post(endPoint, {
            star,
            content
        });
        return product;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};

export const modifyReview = async (id, star, content, reviewId) => {
    try {
        let endPoint = `/customer/order/${id}/review/${reviewId}`
        
        const {data: product} = await api.put(endPoint, {
            star,
            content
        });
        return product;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};

export const delReview = async (id, reviewId) => {
    try {
        let endPoint = `/customer/order/${id}/review/${reviewId}`
        
        const {data: product} = await api.delete(endPoint);
        return product;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};