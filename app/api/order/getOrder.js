// Create Token
import api from '..';

export default async (id = -1) => {
    try {
        let endPoint = `/customer/order`
        
        const {data: orders} = await api.get(endPoint);
        return orders;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};