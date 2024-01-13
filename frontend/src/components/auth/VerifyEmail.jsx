import React, {useState} from 'react';
import Container from '../Container';
import Title from '../Title';
import FormInput from '../forms/FormInput';
import SubmitButton from '../forms/SubmitButton';
import CustomLink from '../CustomLink';

const OTP_LENGTH = 6;
export default function VerifyEmail() {
   const [OTP, setOTP] = useState(new Array(OTP_LENGTH).fill(""));
   return (
      <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
         <Container>
            <form className="bg-secondary rounded p-6 min-w-30 space-y-6 pb-9">
               <section>
                  <Title>Verify Email</Title>
                  <p className="text-center text-dark-subtle">
                     Enter the OTP sent to your email
                  </p>
               </section>
               <section className="flex justify-center items-center space-x-4">
                  {OTP.map((_, index) => {
                     return (
                        <input
                           key={index}
                           type="number"
                           className="w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-2xl"
                        />
                     );
                  })}
               </section>
               <SubmitButton value="Submit OTP"/>
            </form>
         </Container>
      </div>
   )
}