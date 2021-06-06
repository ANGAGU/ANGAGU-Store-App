import api from '..';
// 휴대폰 인증 번호 발송
export const changePw = async (oldPw, newPw) => {
    try {
        const {data: token} = await api.post(`/customer/info`, {
            oldPw,
            newPw
      });
        return token;
    } catch (error) {
        if (error.response.data)
            return error.response.data;
        else 
            return false;
    }
};