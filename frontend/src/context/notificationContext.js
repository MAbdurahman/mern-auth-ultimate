import React, {useState, createContext} from 'react';

export const NotificationContext = createContext();
let timeoutID1;
let timeoutID2;
export default function NotificationProvider({ children }) {

   const [notification, setNotification] = useState("");
   const [classes, setClasses] = useState("");
   const [exitToLeft, setExitToLeft] = useState(false);


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
         setExitToLeft(true);

         timeoutID2 = setTimeout(() => {
            setNotification("");
            setExitToLeft(false);
         }, 1500);

      }, 3500);
   };


   return (
      <NotificationContext.Provider value={{updateNotification}}>
         {children}
         {notification && (<div className="fixed left-1/2 -translate-x-1/2 top-24 ">
            <div
               className={`${exitToLeft ? "exit-to-left" : "move-in-from-right"}` + " shadow-md shadow-gray-400 bg-red-800 rounded"}>
               <p className={classes + ' text-gray-300 px-4 py-2 font-body font-semibold'}>
                  {notification}
               </p>
            </div>
         </div>)}
      </NotificationContext.Provider>
   );
}