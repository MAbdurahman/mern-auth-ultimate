import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';

export default function ForgotPassword() {
   return (
      <FormContainer>
         <Container>
            <form className={themeFormClasses}>
               <Title>Forgot Password</Title>
               <FormInput label="Email" placeholder="example@email.com" name="email" />
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