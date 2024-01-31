import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {ImSpinner2} from 'react-icons/im';
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';
import {useNotification} from '../../hooks/notificationHook';
import {verifyPasswordResetTokenUser} from '../../axiosUtils/axiosUserUtils';
import {validatePasswordAndConfirmedPassword} from '../../utils/functionUtils';
import {resetPasswordUser} from '../../axiosUtils/axiosUserUtils';


export default function ResetPassword() {
   const [password, setPassword] = useState({newPassword: '', confirmPassword: ''});
   const [isVerifying, setIsVerifying] = useState(false);
   const [isValid, setIsValid] = useState(false);
   const [searchParams] = useSearchParams();
   const token = searchParams.get('token');
   const userId = searchParams.get('id');

   const navigate = useNavigate();
   const {updateNotification} = useNotification();
   const {newPassword, confirmPassword} = password;

   useEffect(() => {
      isValidToken();
   }, []);
   const isValidToken = async () => {
      const {error, valid} = await verifyPasswordResetTokenUser(token, userId);
      setIsVerifying(false);
      if (error) {
         navigate('/auth/reset-password', {replace: true});
         return updateNotification('error', error);
      }

      if (!valid) {
         setIsValid(false);
         return navigate('/auth/reset-password', {replace: true});
      }

      setIsValid(true);
   };

   const handleChange = ({target}) => {
      const {name, value} = target;
      setPassword({...password, [name]: value});
   };

   const handleSubmit = async e => {
      e.preventDefault();

      if (validatePasswordAndConfirmedPassword(newPassword, confirmPassword)) {
         const {
            isValid,
            error
         } = validatePasswordAndConfirmedPassword(newPassword, confirmPassword);
         if (!isValid) {
            return updateNotification('error', error);
         }
      }
      const {error, message} = await resetPasswordUser({newPassword, userId, token});
      if (error) {
         return updateNotification('error', error);
      }
      updateNotification('success', message);
      navigate("/auth/sign-in", { replace: true });

   };


   if (isVerifying) {
      return (<FormContainer>
            <Container>
               <div className="flex space-x-2 items-center">
                  <h2
                     className="text-4xl font-semibold dark:text-white text-primary">
                     Verifying your token!
                  </h2>
                  <ImSpinner2
                     className="animate-spin text-4xl dark:text-white text-primary"/>
               </div>
            </Container>
         </FormContainer>);
   }

   if (!isValid) {
      return (<FormContainer>
            <Container>
               <h2 className="text-4xl font-semibold dark:text-white text-primary">
                  The token is invalid!
               </h2>
            </Container>
         </FormContainer>);
   }

   return (<FormContainer>
      <Container>
         <form className={themeFormClasses} onSubmit={handleSubmit}>
            <Title>Reset Password</Title>
            <FormInput
               value={password.newPassword}
               onChange={handleChange}
               label="New Password"
               placeholder="*************"
               name="newPassword"
               type="password"
            />
            <FormInput
               value={password.confirmPassword}
               onChange={handleChange}
               label="Confirm Password"
               placeholder="*************"
               name="confirmPassword"
               type="password"
            />
            <SubmitButton value="Submit"/>
         </form>
      </Container>
   </FormContainer>)
}