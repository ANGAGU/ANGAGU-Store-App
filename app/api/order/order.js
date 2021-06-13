// Create Token
import api from '..';

export const setOrder = async (productId, count, import1, import2, addressId, price, deliveryFee) => {
    try {
        let endPoint = `/customer/order`
        
        const {data: order} = await api.post(endPoint, {
            productId,
            count,
            import1,
            import2,
            addressId,
            price,
            deliveryFee
        });
        return order;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};

export const getOrder = async () => {
    try {
        let endPoint = `/customer/order`
        
        const {data: order} = await api.get(endPoint);

        return order;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};

export const refund = async (orderId, text) => {
    try {
        let endPoint = `/customer/refund/${orderId}`
        
        const {data: order} = await api.post(endPoint, {
            text
        });

        return order;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
}