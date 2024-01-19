import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signUpUser} from '../../axiosUtils/axiosUserUtils';
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';
import {useNotification} from '../../hooks/notificationHook';

const validateUserInfo = ({name, email, password}) => {
   let name_trimmed = name.trim();
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;

   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,32}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   if (name_trimmed.length === 0) {
      return {isValid: false, error: 'Your first and last name are required!'};
   }
   if (!name_trimmed.match(name_pattern)) {
      return {isValid: false, error: 'Enter your first and last name!'};
   }
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
         isValid: false,
         error: 'Password must have at least one number character!'
      };
   }
   if (!password_trimmed.match(special_pattern)) {
      return {
         isValid: false,
         error: 'Password must include at least one: \'-+_!@#$%^&*?\''
      };
   }
   if (!password_trimmed.match(password_pattern)|| password_trimmed.length >= 33) {
      return {
         isValid: false,
         error: 'Password must have between 8 and 32 characters!'
      };
   }

   return {isValid: true};
}

export default function SignUp() {
   const [userInfo, setUserInfo] = useState({
      name: '', email: '', password: ''
   });

   const navigate = useNavigate();
   const { updateNotification } = useNotification();

   const handleChange = ({target}) => {
      const {name, value} = target;
      setUserInfo({...userInfo, [name]: value});
   };
   const handleSubmit = async e => {
      e.preventDefault();
      const {isValid, error} = validateUserInfo(userInfo);
      /*const BASE_URL = 'http://127.0.0.1:5000/api/v1.0';*/

      if (!isValid) {
         return updateNotification("error", error);
      }

      const response = await signUpUser(userInfo);
      if (response.error) {
         return console.log(response.error);
      }

      navigate("/auth/verify-email", {
         state: { user: response.user },
         replace: true,
      });
      /*try {
         const {data} = await axios.post(`${BASE_URL}/auth/sign-up`, userInfo);
         /!*return data;*!/
         navigate("/auth/verify-email", {
            state: { user: data.user },
            replace: true,
         });
      }
      catch (err) {
         const {response} = err;
         if (response?.data) {
            return response.data;
         }
         return {error: err.message || err};
      }*/
   }

   const {name, email, password} = userInfo;

   return (<FormContainer>
      <Container>
         <form onSubmit={handleSubmit} className={themeFormClasses}>
            <Title>Sign Up</Title>
            <FormInput label="Name" value={name} onChange={handleChange}
                       placeholder="Full name" name="name"/>
            <FormInput label="Email" value={email} onChange={handleChange}
                       placeholder="example@email.com" name="email"/>
            <FormInput label="Password" value={password} type="password"
                       onChange={handleChange} placeholder="*************"
                       name="password"/>
            <SubmitButton value="Sign Up"/>
            <div className="flex justify-end">
               <CustomLink to="/auth/forgot-password">Forgot
                  Password&nbsp;/</CustomLink>
               <CustomLink to="/auth/sign-in">&nbsp;Sign In</CustomLink>
            </div>
         </form>
      </Container>
   </FormContainer>)
}