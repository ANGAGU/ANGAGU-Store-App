import api from '..';
// 휴대폰 인증 번호 발송
export const findAuthPhone = async (phone_number) => {
    try {
        const {data: token} = await api.post(`/customer/find/code`, {
            phone_number
      });
        return token;
    } catch (error) {
        if (error.response.data)
            return error.response.data;
        else 
            return false;
    }
};

// 아이디 찾기
export const findId =  async (phone_number, name, code) => {
    try {
        const {data: token} = await api.get(`/customer/find/id?phone_number=${phone_number}&name=${name}&code=${code}`);
        return token;
    } catch (error) {
        if (error.response.data)
            return error.response.data;
        else 
            return false;
    }
};

// 휴대폰 코드 인증 = 비밀번호 찾기 용
export const findVeryPhone = async (phone_number, code) => {
    try {
        const {data: token} = await api.post(`/customer/find/verification`, {
            phone_number,
            code
        });
        return token;
    } catch (error) {
        if (error.response.data)
            return error.response.data;
        else 
            return false;
    }
};

// 휴대폰 코드 인증 = 비밀번호 찾기 용
export const findVeryInfo = async (name, email, token) => {
    try {
        const {data: result} = await api.get(`/customer/find/pw?email=${email}&name=${name}`,
        {
            headers: {
               verification: token
            }
        }
        );
        return result;
    } catch (error) {
        if (error.response.data)
            return error.response.data;
        else 
            return false;
    }
};


// 비밀번호 찾기
export const findPw = async (newPw, token) => {
    try {
        const {data: result} = await api.put(`/customer/find/pw`, {
            newPw
        },
        {
            headers: {
               verification: token
            }
        }
        );
        return result;
    } catch (error) {
        if (error.response.data)
            return error.response.data;
        else 
            return false;
    }
};