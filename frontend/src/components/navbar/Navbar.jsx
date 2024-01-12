import {BsFillSunFill} from 'react-icons/bs';

export default function Navbar() {

   return (
      <div className="bg-secondary">
         <div className="max-w-screen-xl mx-auto p-2">
            <div className="flex justify-between items-center">
               <section className="flex flex-row justify-center items-center gap-1 text-white">
               <img src="./logo192.png" alt="" className="h-10"/>
                  <h4 className="font-heading font-semibold text-lg">Mern Auth Ultimate</h4>
               </section>


               <ul className="flex items-center space-x-4">
                  <li>
                     <button className="bg-dark-subtle p-1 rounded">
                        <BsFillSunFill className="text-secondary" size={24}/>
                     </button>
                  </li>
                  <li>
                     <input
                        type="text"
                        className="border-2 border-dark-subtle p-1 rounded bg-transparent text-lg outline-none focus:border-white transition text-white"
                        placeholder="search..."
                     />
                  </li>
                  <li className="font-body tracking-wider uppercase text-white font-semibold text-lg cursor-pointer">Sign In</li>
               </ul>
            </div>
         </div>
      </div>
   );
}