import Navbar from '../components/navbar/Navbar';
import SignIn from '../components/auth/SignIn';
import {SignUp} from '../components/auth/SignUp';

export default function App() {

    return (
       <>
       <Navbar />
          <SignUp />
       </>

    );
}