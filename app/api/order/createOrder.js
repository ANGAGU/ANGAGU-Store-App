// Create Token
import api from '..';

export default async (productId) => {
    try {
        let endPoint = `/customer/order`
        
        const {data: order} = await api.post(endPoint, {
            productId
        });
        return order;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};