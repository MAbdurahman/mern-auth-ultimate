import {Routes, Route} from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import HomePage from '../pages/HomePage';
import VerifyEmail from '../components/auth/VerifyEmail';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import ConfirmPassword from '../components/auth/ConfirmPassword';
import NotFoundPage from '../pages/NotFoundPage';

export default function App() {

   return (
      <>
         <Navbar/>
         <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/auth/sign-in" element={<SignIn/>}/>
            <Route path="/auth/sign-up" element={<SignUp/>}/>
            <Route path="/auth/verify-email" element={<VerifyEmail/>}/>
            <Route path="/auth/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/auth/reset-password" element={<ResetPassword/>}/>
            <Route path="/auth/confirm-password" element={<ConfirmPassword/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
         </Routes>
      </>

   );
}