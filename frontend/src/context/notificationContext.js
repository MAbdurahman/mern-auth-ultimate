import React, { createContext } from "react";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
   const updateNotification = () => {};

   return (
      <NotificationContext.Provider value={{updateNotification}}>
         {children}
         <div className="fixed left-1/2 -translate-x-1/2 top-24 ">
            <div
               className="animate-notification-bounce shadow-md shadow-gray-400 bg-red-800 rounded">
               <p className="text-white px-4 py-2 font-semibold tracking-wider ">
                  Internal Error!
               </p>
            </div>
         </div>
      </NotificationContext.Provider>
   );
}