import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';

export default function ForgotPassword() {
   return (
      <div
         className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
         <Container>
            <form className="bg-secondary rounded p-6 min-w-30 space-y-6 pb-9">
               <Title>Forgot Password</Title>
               <FormInput label="Email" placeholder="example@email.com" name="email" />
               <SubmitButton value="Send Email" />

               <div className="flex justify-end">
                  <CustomLink to="/auth/sign-in">Sign In&nbsp;/</CustomLink>
                  <CustomLink to="/auth/sign-up">&nbsp;Sign up</CustomLink>
               </div>
            </form>
         </Container>
      </div>
   )
}