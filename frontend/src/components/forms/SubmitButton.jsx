import React from 'react';
import {ImSpinner2} from 'react-icons/im';

export default function SubmitButton({value, busy}) {
   return (<button
      type="submit"
      className="w-full rounded uppercase font-bold  dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition text-lg cursor-pointer h-10 flex items-center justify-center" >
      {busy ? <ImSpinner2 className="animate-spin"/> : value}
   </button>);
};