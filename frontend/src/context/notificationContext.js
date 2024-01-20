import React, { useState, useRef, createContext } from "react";

export const NotificationContext = createContext();
let timeoutID1;
let timeoutID2;
export default function NotificationProvider({ children }) {
   const [notification, setNotification] = useState("");
   const [classes, setClasses] = useState("");
   const notificationRef = useRef();
   const updateNotification = (type, value) => {

      if (timeoutID1) {
         clearTimeout(timeoutID1);
         clearTimeout(timeoutID2);
      }

      switch (type) {
         case "error":
            setClasses("bg-red-800");
            break;
         case "success":
            setClasses("bg-green-800");
            break;
         case "warning":
            setClasses("bg-yellow-600");
            break;
         default:
            setClasses("bg-red-800");
      }
      setNotification(value);

      timeoutID1 = setTimeout(() => {
         notificationRef.current.classList.remove('move-in-from-right');
         notificationRef.current.classList.add('exit-to-left');

         timeoutID2 = setTimeout(() => {
            setNotification("");
         }, 1500);

      }, 3500);
   };

   return (
      <NotificationContext.Provider value={{updateNotification}}>
         {children}
         {notification && (<div className="fixed left-1/2 -translate-x-1/2 top-24 ">
            <div ref={notificationRef}
               className="move-in-from-right shadow-md shadow-gray-400 bg-red-800 rounded">
               <p className={classes + ' text-gray-300 px-4 py-2 font-body font-semibold'}>
                  {notification}
               </p>
            </div>
         </div>)}
      </NotificationContext.Provider>
   );
}