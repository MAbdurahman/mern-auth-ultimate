import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';

export default function ConfirmPassword() {
   return (
      <FormContainer>
         <Container>
            <form className={themeFormClasses}>
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
      </FormContainer>
)
}