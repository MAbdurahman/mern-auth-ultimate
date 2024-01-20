import React, {useState, useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Container from '../Container';
import Title from '../Title';
import SubmitButton from '../forms/SubmitButton';
import {themeFormClasses} from '../../utils/themeUtils';
import FormContainer from '../forms/FormContainer';
import {verifyEmailTokenUser} from '../../axiosUtils/axiosUserUtils';
import {useNotification} from '../../hooks/notificationHook';

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOTP = (OTP) => {
   let isValid = false;

   for (let val of OTP) {
      isValid = !isNaN(parseInt(val));
      if (!isValid) {
         break;
      }
   }

   return isValid;
};
export default function VerifyEmail() {
   const [OTP, setOTP] = useState(new Array(OTP_LENGTH).fill(""));
   const [activeOTPIndex, setActiveOTPIndex] = useState(0);

   const inputRef = useRef();
   // eslint-disable-next-line
   const navigate = useNavigate();
   const {updateNotification} = useNotification();
   const { state } = useLocation();
   const user = state?.user;


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

   const handleSubmit = async e => {
     e.preventDefault();
      if (!isValidOTP(OTP)) {
         return console.log(`OTP is valid is ${isValidOTP(OTP)}`);
      }
      console.log(`${OTP}`)

      const { error, message } = await verifyEmailTokenUser({
         OTP: OTP.join(""),
         userId: user.id,
      });

      if (error) {
         return updateNotification('error', error);
      }

      updateNotification("success", message);

   };

   useEffect(() => {
      inputRef.current?.focus();
   }, [activeOTPIndex]);

/*   useEffect(() => {
      if (!user) {
         navigate('/not-found');
      }
   }, [navigate, user]);*/

   return (
      <FormContainer>
         <Container>
            <form onSubmit={handleSubmit} className={themeFormClasses}>
               <section>
                  <Title>Verify Email</Title>
                  <p className="text-center dark:text-dark-subtle text-light-subtle">
                     Enter the OTP Code sent to your email
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
                           className="w-12 h-12 border-2  dark:border-dark-subtle  border-light-subtle darK:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center  dark:text-white text-primary  font-semibold text-2xl"
                        />
                     );
                  })}
               </section>
               <SubmitButton value="Submit OTP"/>
            </form>
         </Container>
      </FormContainer>
   )
}