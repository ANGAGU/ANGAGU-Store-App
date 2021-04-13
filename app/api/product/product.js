// Create Token
import api from '..';

export default async (id = -1) => {
    try {
        let endPoint = `/customer/products`
        if (id != -1) endPoint = endPoint + "/" + id;
        
        const {data: product} = await api.get(endPoint);
        return product;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};