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