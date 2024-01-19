import React, { useState, createContext } from "react";

export const NotificationContext = createContext();
let timeoutID;
export default function NotificationProvider({ children }) {
   const [notification, setNotification] = useState("");
   const [classes, setClasses] = useState("");
   const updateNotification = (type, value) => {
      if (timeoutID) {
         clearTimeout(timeoutID);
      }

      switch (type) {
         case "error":
            setClasses("bg-red-800");
            break;
         case "success":
            setClasses("bg-green-800");
            break;
         case "warning":
            setClasses("bg-yellow-400");
            break;
         default:
            setClasses("bg-red-800");
      }
      setNotification(value);

      timeoutID = setTimeout(() => {
         setNotification("");
      }, 3500);
   };

   return (
      <NotificationContext.Provider value={{updateNotification}}>
         {children}
         {notification && (<div className="fixed left-1/2 -translate-x-1/2 top-24 ">
            <div
               className="bounce-in-right shadow-md shadow-gray-400 bg-red-800 rounded">
               <p className={classes + ' text-white px-4 py-2 font-body font-semibold'}>
                  {notification}
               </p>
            </div>
         </div>)}
      </NotificationContext.Provider>
   );
}