import {useNavigate} from 'react-router-dom';
import FormContainer from '../components/forms/FormContainer';
import Container from '../components/Container';

export default function NotFoundPage() {
   const navigate = useNavigate();

   function handleClick() {
      navigate('/')
   }

   return (
      <FormContainer>
      <Container>
      <div
      className="grid-center px-4 py-12 max-w-2xl mx-auto ">
      <div className="flex flex-col justify-center text-center mb-8">
         <h2 className="font-heading font-bold dark:text-gray-200 text-gray-950 text-9xl">404</h2>
         <p className="text-4xl font-body dark:text-gray-300 text-gray-950 font-semibold">
            Page Not Found
         </p>
      </div>
      <div className="text-center ">
         <button
            onClick={handleClick}
            className="font-body font-semibold dark:bg-gray-300 bg-black dark:text-black text-white py-2 px-4 rounded">Back
            To Home
         </button>
      </div>
   </div>
      </Container>
      </FormContainer>
         )
}