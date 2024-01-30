import {useSearchParams} from 'react-router-dom';
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';

export default function ResetPassword() {
   const [searchParams] = useSearchParams();
   const token = searchParams.get("token");
   const userId = searchParams.get("id");


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