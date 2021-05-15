import api from '..';
// Email Check
export const signUpEmailCheck = async (email) => {
    try {
        const {data: token} = await api.post(`/customer/signup/email`, {
            email
      });
        return token;
    } catch (error) {
        if (error.response.data)
            return error.response.data;
        else 
            return false;
    }
};

// Phone Request
export const signUpMessageRequest =  async (phone_number) => {
    try {
        const {data: token} = await api.post(`/customer/signup/sms/code`, {
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

// Phone Response
export const signUpMessageResponse = async (phone_number, code) => {
    try {
        const {data: token} = await api.post(`/customer/signup/sms/verification`, {
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
// SignUp
export const signUp = async (verification, email, password, name, birth, phone_number) => {
    try {
        const {data: token} = await api.post(`/customer/signup`, {
            email,
            password,
            name,
            birth,
            phone_number
        },
        {
            headers: {
                verification
            },
        });
        return token;
    } catch (error) {
        if (error.response.data)
            return error.response.data;
        else 
            return false;
    }
};
