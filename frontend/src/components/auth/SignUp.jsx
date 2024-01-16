import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';

export default function SignUp() {
   return (
      <FormContainer>
         <Container>
            <form className={themeFormClasses}>
               <Title>Sign Up</Title>
               <FormInput label="Name" placeholder="Full name" name="name" />
               <FormInput label="Email" placeholder="example@email.com" name="email"/>
               <FormInput label="Password" placeholder="*************" name="password"/>
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