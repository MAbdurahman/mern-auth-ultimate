import axiosCreate from './axiosCreateUtils';


export const signUpUser = async (userInfo) => {
   try {
      const { data } = await axiosCreate.post("/auth/sign-up", userInfo);
      return data;

   } catch (error) {
      const { response } = error;

      if (response?.data) {
         return response.data;
      }

      return { error: error.message || error };
   }
};

export const verifyEmailTokenUser = async (userInfo) => {
   try {
      const { data } = await axiosCreate.post("/auth/verify-email-token", userInfo);
      return data;

   } catch (error) {
      const { response } = error;

      if (response?.data) {
         return response.data;
      }

      return { error: error.message || error };
   }
};

export const signInUser = async (userInfo) => {
   try {
      const {data} = await axiosCreate.post('/auth/sign-in', userInfo);
      return data;

   }
   catch (err) {
      const {response} = err;
      if (response?.data) {
         return response.data;
      }
      return {error: err.message || err}
   }

};

export const getIsAuthorizedUser = async (token) => {
   try {
      const { data } = await axiosCreate.get('/auth/is-authorized', {
         headers: {
            Authorization: "Bearer " + token,
            accept: "application/json",
         },
      });
      return data;
   } catch (err) {
      const { response } = err;
      if (response?.data) {
         return response.data;
      }

      return { error: err.message || err };
   }

};

export const forgotPasswordUser = async (email) => {
   try {
      const { data } = await axiosCreate.post('/auth/forgot-password', { email });
      return data;
   } catch (err) {
      const { response } = err;
      if (response?.data) {
         return response.data;
      }

      return { error: err.message || err };
   }
};

export const verifyPasswordResetTokenUser = async (token, userId) => {
   try {
      const { data } = await axiosCreate.post('/auth/verify-password-reset-token', {
         token,
         userId,
      });
      return data;
   } catch (err) {
      const { response } = err;
      if (response?.data) {
         return response.data;
      }

      return { error: err.message || err };
   }

};

export const resetPasswordUser = async (passwordInfo) => {
   await console.log('resetPasswordUser', {passwordInfo});
   try {
      const { data } = await axiosCreate.post("/auth/reset-password", passwordInfo);
      return data;

   } catch (err) {
      const { response } = err;
      if (response?.data) {
         return response.data;
      }

      return { error: err.message || err };
   }
};

export const resendEmailVerificationTokenUser = async (userId) => {
   await console.log('resendEmailVerificationTokenUser', {userId});

};