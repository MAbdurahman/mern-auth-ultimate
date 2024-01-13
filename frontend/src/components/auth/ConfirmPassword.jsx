import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';

export default function ConfirmPassword() {
   return (
      <div
         className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
         <Container>
            <form className="bg-secondary rounded p-6 min-w-30 space-y-6 pb-9">
               <Title>Confirm Password</Title>
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
      </div>
)
}