// Create Token
import api from '..';

export default async (id = -1) => {
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