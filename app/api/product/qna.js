import api from '..';

export const getQna = async (id) => {
    try {
        let endPoint = `/customer/products/${id}/board`
        
        const {data: product} = await api.get(endPoint);
        return product;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};