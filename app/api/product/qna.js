import api from '..';

export const getQna = async (id) => {
    try {
        let endPoint = `/customer/products/${id}/board`
        
        const {data: product} = await api.get(endPoint);
        return product;
    } catch (error) {
        return error.response;
    }
};

export const setQna = async (id, content) => {
    try {
        let endPoint = `/customer/products/${id}/board`

        const {data: qna} = await api.post(endPoint, {
            title: content,
            content
        });
        return qna
    } catch {error} {
        return error.response;
    }
}