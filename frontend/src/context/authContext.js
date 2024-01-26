
import React, { createContext, useEffect, useState } from "react";
import {getIsAuthorizedUser, signInUser} from '../axiosUtils/axiosUserUtils';
import {useNotification} from '../hooks/notificationHook';


export const AuthContext = createContext();

const defaultAuthInfo = {
   profile: null,
   isLoggedIn: false,
   isPending: false,
   error: "",
};
export default function AuthProvider({ children }) {
   const [authInfo, setAuthInfo] = useState({...defaultAuthInfo});
   const {updateNotification} = useNotification();

   const handleLogin = async (email, password) => {
      setAuthInfo({...authInfo, isPending: true});
      const {error, user} = await signInUser({email, password});
      if (error) {
         updateNotification("error", error);
         return setAuthInfo({...authInfo, isPending: false, error});
      }

      setAuthInfo({
         profile: {...user},
         isLoggedIn: true,
         isPending: false,
         error: "",
      });

      localStorage.setItem("auth-token", user.token);
   };

   const isAuth = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
         return;
      }

      setAuthInfo({...authInfo, isPending: false});
      /*const {error, user} = await getIsAuthorizedUser(token);
      if (error) {
         updateNotification("error", error);
         return setAuthInfo({...authInfo, isPending: false, error});
      }*/

      /*setAuthInfo({
         profile: {...user},
         isLoggedIn: true,
         isPending: false,
         error: "",
      });*/
   };

   const handleLogout = () => {
      localStorage.removeItem("auth-token");
      setAuthInfo({...defaultAuthInfo});
   };

   useEffect(() => {
      isAuth();
   }, []);

   //  handleLogout
   return (
      <AuthContext.Provider
         value={{authInfo, handleLogin, handleLogout, isAuth}}
      >
         {children}
      </AuthContext.Provider>
   );
}