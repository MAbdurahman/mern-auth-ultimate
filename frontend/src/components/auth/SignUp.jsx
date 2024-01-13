import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';

export default function SignUp() {
   return (
      <div
         className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
         <Container>
            <form className="bg-secondary rounded p-6 min-w-30 space-y-6 pb-9">
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
      </div>
   )
}