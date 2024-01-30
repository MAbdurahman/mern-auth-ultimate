import React, {useEffect, useState} from 'react';
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
import {useAuth} from '../../hooks/authHook';
import {validateUserInfo} from '../../utils/functionUtils';

export default function SignUp() {
   const [userInfo, setUserInfo] = useState({
      username: '', email: '', password: ''
   });

   const navigate = useNavigate();
   const { updateNotification } = useNotification();
   const { authInfo } = useAuth();
   const { isLoggedIn } = authInfo;

   const handleChange = ({target}) => {
      const {name, value} = target;
      setUserInfo({...userInfo, [name]: value});
   };
   const handleSubmit = async e => {
      e.preventDefault();
      const {isValid, error} = validateUserInfo(userInfo);

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

   }

   useEffect(() => {
      // we want to move our user to somewhere else
      if (isLoggedIn) {
         navigate('/');
      }
   }, [isLoggedIn, navigate]);

   const {username, email, password} = userInfo;



   return (<FormContainer>
      <Container>
         <form onSubmit={handleSubmit} className={themeFormClasses}>
            <Title>Sign Up</Title>
            <FormInput label="Name" value={username} onChange={handleChange}
                       placeholder="Full name" name="username"/>
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