import React, {useState, useEffect, useRef} from 'react';
import Container from '../Container';
import Title from '../Title';
import SubmitButton from '../forms/SubmitButton';


const OTP_LENGTH = 6;
let currentOTPIndex;
export default function VerifyEmail() {
   const [OTP, setOTP] = useState(new Array(OTP_LENGTH).fill(""));
   const [activeOTPIndex, setActiveOTPIndex] = useState(0);

   const inputRef = useRef();

   const focusNextInputField = (index) => {
      setActiveOTPIndex(index + 1);
   };

   const focusPrevInputField = (index) => {
      let nextIndex;
      const diff = index - 1;
      nextIndex = diff !== 0 ? diff : 0;
      setActiveOTPIndex(nextIndex);
   };

   const handleOTPChange = ({ target }) => {
      const { value } = target;
      const newOTP = [...OTP];
      newOTP[currentOTPIndex] = value.substring(value.length - 1, value.length);

      if (!value) {
         focusPrevInputField(currentOTPIndex);
      }
      else {
         focusNextInputField(currentOTPIndex);
      }
      setOTP([...newOTP]);
   }
   const handleKeyDown = ({ key }, index) => {
      currentOTPIndex = index;
      if (key === "Backspace") {
         focusPrevInputField(currentOTPIndex);
      }
   };

   useEffect(() => {
      inputRef.current?.focus();
   }, [activeOTPIndex]);

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
                           ref={activeOTPIndex === index ? inputRef : null}
                           value={OTP[index] || ""}
                           onChange={handleOTPChange}
                           onKeyDown={(e) => handleKeyDown(e, index)}
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