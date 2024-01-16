import React, {useState} from 'react';
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';

const validateUserInfo =({name, email, password}) => {
   let name_trimmed = name.trim();
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const name_pattern = /^([A-Za-z]{1,}s?'?-?[A-Za-z]{1,}s?'?-?[a-zA-Z]{1,})(.+?)([^\s,]+)(,? (?:[JS]r\.?|II|III|IV))?$/i;

   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,32}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   if (name_trimmed.length === 0) {
      return { isValid: false, error: "Your first and last name are required!"};
   }
   if (!name_trimmed.match(name_pattern)) {
      return {isValid: false, error: "Enter your first and last name!"};
   }
   if (email_trimmed.length === 0) {
      return {isValid: false, error: "Your email is required!"};
   }
   if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: "Enter a valid email!"};
   }
   if (password_trimmed.length === 0) {
      return {isValid: false, error: "Your password is required!"};
   }
   if (!password_trimmed.match(lowercase_pattern)) {
      return {isValid: false, error: "Password must have at least one lowercase character!"};
   }
   if (!password_trimmed.match(uppercase_pattern)) {
      return {isValid: false, error: "Password must have at least one uppercase character!"};
   }
   if (!password_trimmed.match(digit_pattern)) {
      return {isValid: false, error: "Password must have at least one number character!"};
   }
   if (!password_trimmed.match(special_pattern)) {
      return {isValid: false, error: "Password must include at least one: '-+_!@#$%^&*?'"};
   }
   if (!password_trimmed.match(password_pattern)){
      return {isValid: false, error: "Password must have at least 8 and no more than 32 characters!"};
   }

   return {isValid: true};
}

export default function SignUp() {
   const [userInfo, setUserInfo] = useState({
      name: "",
      email: "",
      password: ""
   });

   const handleChange = ({ target }) => {
      const { name, value } = target;
      setUserInfo({ ...userInfo, [name]: value });
   };
   const handleSubmit = e => {
      e.preventDefault();
      const { isValid, error } = validateUserInfo(userInfo);

      if (!isValid) {
         return console.log(error);
      }

      console.log(userInfo);
   }

   const {name, email, password} = userInfo;

   return (
      <FormContainer>
         <Container>
            <form onSubmit={handleSubmit} className={themeFormClasses}>
               <Title>Sign Up</Title>
               <FormInput label="Name" value={name} onChange={handleChange} placeholder="Full name" name="name" />
               <FormInput label="Email" value={email} onChange={handleChange} placeholder="example@email.com" name="email"/>
               <FormInput label="Password" value={password} type="password" onChange={handleChange} placeholder="*************" name="password"/>
               <SubmitButton value="Sign Up"/>
               <div className="flex justify-end">
                  <CustomLink to="/auth/forgot-password">Forgot Password&nbsp;/</CustomLink>
                  <CustomLink to="/auth/sign-in">&nbsp;Sign In</CustomLink>
               </div>
            </form>
         </Container>
      </FormContainer>
   )
}