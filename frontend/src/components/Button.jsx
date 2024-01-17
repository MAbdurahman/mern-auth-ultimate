import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Button({children}) {
   const navigate = useNavigate();

   function handleClick() {
      navigate('/auth/sign-in');
   }

   return (<button onClick={handleClick}
                   className="dark:bg-gray-300 bg-black dark:text-black text-white hover:bg-gray-700 py-4 px-8 rounded-md border-none uppercase font-bold text-lg text-logo-blue cursor-pointer">
      {children}
   </button>)
}