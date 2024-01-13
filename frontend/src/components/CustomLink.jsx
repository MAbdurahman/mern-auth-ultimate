import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({to, children}) {
   return (
      <Link to={to} className="text-dark-subtle hover:text-white transition capitalize cursor-pointer" >
         {children}
      </Link>
   )
}