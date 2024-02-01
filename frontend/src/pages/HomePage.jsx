import { useNavigate } from "react-router-dom";
import Button from '../components/Button.jsx';
import FormContainer from '../components/forms/FormContainer';
import Container from '../components/Container';
import {useAuth} from '../hooks/authHook';

export default function HomePage() {
   const {authInfo} = useAuth();
   const { isLoggedIn } = authInfo;
   const isVerified = authInfo.profile?.isVerified;
   const navigate = useNavigate();

   const handleVerifyButtonClick = () => {
      navigate("/auth/verify-email", { state: { user: authInfo.profile } });
   }

   return (<FormContainer>
         <Container>
            <div
               className="flex flex-col justify-center items-center w-full h-screen">
               {isLoggedIn && !isVerified ? (<section className="mb-5 flex flex-col">
                  <h3
                     className="mb-1 px-2 tracking-wider text-2xl text-center dark:text-gray-300 text-gray-900 font-medium">Your
                     account has not been verified</h3>
                  <button onClick={handleVerifyButtonClick}
                     className="text-2xl tracking-wider text-center dark:text-red-800 text-red-800 uppercase font-semibold">Verify
                     Account!
                  </button>
               </section>) : null}
               <h1
                  className="mb-5 text-5xl dark:text-white text-gray-950 font-extrabold">MERN
                  Auth Ultimate</h1>
               <h2
                  className="mb-7 px-2 text-2xl text-center dark:text-gray-300 text-gray-900 font-medium">Keep
                  your profile information in one secure
                  location,<br/> accessible to you everywhere</h2>
               <Button>Start Now</Button>
            </div>
         </Container>
   </FormContainer>)
}