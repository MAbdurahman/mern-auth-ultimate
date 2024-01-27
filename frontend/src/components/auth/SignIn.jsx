import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';
import {useNotification} from '../../hooks/notificationHook';
import {useAuth} from '../../hooks/authHook';

const validateUserInfo = ({email, password}) => {

   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,32}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Your email is required!'};
   }
   if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: 'Enter a valid email!'};
   }
   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Your password is required!'};
   }
   if (!password_trimmed.match(lowercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must have at least one lowercase character!'
      };
   }
   if (!password_trimmed.match(uppercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must have at least one uppercase character!'
      };
   }
   if (!password_trimmed.match(digit_pattern)) {
      return {
         isValid: false, error: 'Password must have at least one number character!'
      };
   }
   if (!password_trimmed.match(special_pattern)) {
      return {
         isValid: false,
         error: 'Password must include at least one: \'-+_!@#$%^&*?\''
      };
   }
   if (!password_trimmed.match(password_pattern) || password_trimmed.length >= 33) {
      return {
         isValid: false, error: 'Password must have between 8 and 32 characters!'
      };
   }

   return {isValid: true};
}

export default function SignIn() {
   const [userInfo, setUserInfo] = useState({
      email: '', password: '',
   });
   const navigate = useNavigate();
   const {updateNotification} = useNotification();
   const {handleLogin, authInfo} = useAuth();
   const {isPending, isLoggedIn} = authInfo;

   const handleChange = ({target}) => {
      const {value, name} = target;
      setUserInfo({...userInfo, [name]: value});
   };
   const handleSubmit = async e => {
      e.preventDefault();
      const {isValid, error} = validateUserInfo(userInfo);

      if (!isValid) {
         return updateNotification('error', error);
      }

      handleLogin(userInfo.email, userInfo.password);

   }

   useEffect(() => {
      // we want to move our user to somewhere else
      if (isLoggedIn) {
         navigate('/');
      }
   }, [isLoggedIn, navigate]);

   return (<FormContainer>
      <Container>
         <form onSubmit={handleSubmit} className={themeFormClasses}>
            <Title>Sign In</Title>
            <FormInput label="Email" placeholder="example@email.com"
                       onChange={handleChange} value={userInfo.email} name="email"/>
            <FormInput label="Password" placeholder="*************"
                       onChange={handleChange} value={userInfo.password}
                       name="password" type="password"/>
            <SubmitButton value="Sign In" busy={isPending} />
            <div className="flex justify-end">
               <CustomLink to="/auth/forgot-password">Forgot
                  Password&nbsp;/</CustomLink>
               <CustomLink to="/auth/sign-up">&nbsp;Sign Up</CustomLink>
            </div>
         </form>
      </Container>
   </FormContainer>)
}