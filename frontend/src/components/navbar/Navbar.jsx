export default function Navbar() {

   return (
      <div className="bg-secondary">
         <div className="max-w-screen-xl mx-auto p-2">
            <div className="flex justify-between items-center">
               <img src="./logo192.png" alt="Logo" className="h-10"/>
               <ul>
                  <li>Login</li>
               </ul>
            </div>
         </div>
      </div>

   );
}