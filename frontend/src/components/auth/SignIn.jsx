import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';

export default function SignIn() {


   return (
      <div className="fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center">
         <Container>
            <form className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 min-w-30 space-y-6 pb-9">
               <Title>Sign In</Title>
               <FormInput label="Email" placeholder="example@email.com"
                          name="email"/>
               <FormInput label="Password" placeholder="*************" name="password"/>
               <SubmitButton value="Sign In"/>
               <div className="flex justify-end">
                  <CustomLink to="/auth/forgot-password">Forgot Password&nbsp;/</CustomLink>
                  <CustomLink to="/auth/sign-up">&nbsp;Sign Up</CustomLink>
               </div>
            </form>
         </Container>
      </div>
   )
}