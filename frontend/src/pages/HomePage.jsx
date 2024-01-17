import Button from '../components/Button.jsx';
import FormContainer from '../components/forms/FormContainer';
import Container from '../components/Container';

export default function HomePage() {

   return (
      <FormContainer>
         <Container>
      <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="mb-5 text-5xl dark:text-white text-gray-950 font-extrabold">MERN Auth Ultimate</h1>
      <h2
         className="mb-7 px-2 text-2xl text-center dark:text-gray-300 text-gray-900 font-medium">Keep
         your profile information in one secure
         location,<br/> accessible to you everywhere</h2>
      <Button>Start Now</Button>
   </div>
         </Container>
      </FormContainer>
         )
}