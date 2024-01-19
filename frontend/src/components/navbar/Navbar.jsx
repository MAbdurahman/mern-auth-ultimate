import {BsFillSunFill} from 'react-icons/bs';
import Container from '../Container';
import {Link} from 'react-router-dom';
import {useTheme} from '../../hooks/themeHook';
import logo from '../../img/logo.png'

export default function Navbar() {
   const { toggleTheme } = useTheme();

   return (
      <div
         className="bg-secondary shadow-sm shadow-gray-500 fixed z-20 w-full top-0 left-0">
         <Container className="p-2">
            <div className="max-w-screen-xl mx-auto p-2">
               <div className="flex justify-between items-center">
                  <Link to="/">
                     <section
                        className="flex flex-row justify-center items-center gap-1 text-white">
                        <img src={logo} alt="Logo" className="h-10"/>
                        <h4 className="font-heading font-semibold text-lg p-0">Mern
                           Auth
                           Ultimate</h4>
                     </section>
                  </Link>
                  <ul className="flex items-center space-x-4">
                     <li>
                        <button onClick={toggleTheme} className="dark:bg-white bg-dark-subtle p-1 rounded">
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
                     <Link to="/auth/sign-in" >
                        <li
                           className="font-body tracking-wider uppercase text-white font-semibold text-lg cursor-pointer">Sign
                           In
                        </li>
                     </Link>

                  </ul>
               </div>
            </div>
         </Container>
      </div>
   );
}