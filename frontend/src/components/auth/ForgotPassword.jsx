import React, {useState} from 'react';
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';
import {useNotification} from '../../hooks/notificationHook';
import {validateEmail} from '../../utils/functionUtils';

export default function ForgotPassword() {
   const [email, setEmail] = useState("");
   const { updateNotification } = useNotification();

   const handleChange = ({ target }) => {
      const { value } = target;
      setEmail(value);
   };

   const handleSubmit = async e => {
      e.preventDefault();
      const {isValid, error} = validateEmail(email);

      if(!isValid) {
         return updateNotification("error", error);
      }




      return updateNotification("success", "Successfully sent email.");

   }

   return (
      <FormContainer>
         <Container>
            <form onSubmit={handleSubmit} className={themeFormClasses}>
               <Title>Forgot Password</Title>
               <FormInput id="email" onChange={handleChange} value={email} label="Email" placeholder="example@email.com" name="email" />
               <SubmitButton value="Send Email" />

               <div className="flex justify-end">
                  <CustomLink to="/auth/sign-in">Sign In&nbsp;/</CustomLink>
                  <CustomLink to="/auth/sign-up">&nbsp;Sign up</CustomLink>
               </div>
            </form>
         </Container>
      </FormContainer>
   )
}