import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';
import {useNotification} from '../../hooks/notificationHook';

export default function SignIn() {
   const { updateNotification } = useNotification();
const handleSubmit = async e => {
   e.preventDefault();
   updateNotification("warning","handleSubmit incomplete!");
}

   return (
      <FormContainer>
         <Container>
            <form onSubmit={handleSubmit} className={themeFormClasses}>
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
      </FormContainer>
   )
}