
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
export default function SignIn() {
   return (
      <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
         <Container>
            <form className="bg-secondary rounded p-6 min-w-30 space-y-6">
               <Title>Sign In</Title>
               <FormInput label="Email" placeholder="example@email.com" name="email" />
               <FormInput label="Password" placeholder="********" name="password" />
            </form>
      </Container>
      </div>
   )
}