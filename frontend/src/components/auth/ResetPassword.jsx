import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {ImSpinner2} from 'react-icons/im';
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';

export default function ResetPassword() {
   const [isVerifying, setIsVerifying] = useState(true);
   const [searchParams] = useSearchParams();
   const token = searchParams.get("token");
   const userId = searchParams.get("id");


   if (isVerifying)
      return (
         <FormContainer>
            <Container>
               <div className="flex space-x-2 items-center">
                  <h2 className="text-4xl font-semibold dark:text-white text-primary">
                     Verifying your token!
                  </h2>
                  <ImSpinner2 className="animate-spin text-4xl dark:text-white text-primary" />
               </div>
            </Container>
         </FormContainer>
      );


   return (<FormContainer>
      <Container>
         <form className={themeFormClasses}>
            <Title>Reset Password</Title>
            <FormInput
               label="New Password"
               placeholder="*************"
               name="password"
               type="password"
            />
            <FormInput
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