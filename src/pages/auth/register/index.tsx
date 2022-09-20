import {
  Box,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  Flex,
} from "@chakra-ui/react";
import CenterContainer from "../../../components/common/CenterContainer";
import MainContainer from "../../../components/common/MainContainer";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import SendOTP from "../../../components/register/SendOTP";
import { FiClipboard, FiUser } from "react-icons/fi";
import { GrDocumentVerified } from "react-icons/gr";
import VerifyOTP from "../../../components/register/VerifyOTP";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FinalRegistration from "../../../components/register/FinalRegistration";

type SendOTPPayload = {
  fullname: string;
  email: string;
  mobile: string;
};

type VerifyOTPPayload = {
  otp: string;
};

type FinalRegistrationPayload = {
  country: string;
  password: string;
  confirmPassword: string;
};

const phoneRegExp =
  /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
const sendOTPSchema = yup
  .object({
    fullname: yup.string().required("Fullname is required."),
    email: yup
      .string()
      .required("Email is required.")
      .email("Email must be invalid."),
    mobile: yup
      .string()
      .required("Mobile number is required.")
      .matches(phoneRegExp, "Mobile number is not valid"),
  })
  .required();

const finalRegistrationSchema = yup
  .object({
    country: yup.string().required("Country is required."),
    password: yup
      .string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]+/, "Password must contain at least 1 lowercase character")
      .matches(/[A-Z]+/, "Password must contain at least 1 uppercase character")
      .matches(
        /[@$!%*#?&]+/,
        "Password must contain at least 1 special character"
      )
      .matches(/\d+/, "Password must contain at least 1 number"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required.")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const Register = () => {
  const [otp, setOtp] = useState("");
  const useSendOTPForm = useForm<SendOTPPayload>({
    resolver: yupResolver(sendOTPSchema),
  });
  const useFinalRegistrationForm = useForm<FinalRegistrationPayload>({
    resolver: yupResolver(finalRegistrationSchema),
  });

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const steps = [
    {
      label: "Send OTP",
      content: <SendOTP useForm={useSendOTPForm} nextStep={nextStep} />,
      icon: FiUser,
    },
    {
      label: "Verification",
      content: (
        <VerifyOTP
          otp={otp}
          setOtp={setOtp}
          email={useSendOTPForm.getValues("email")}
          nextStep={nextStep}
        />
      ),
      icon: FiClipboard,
    },
    {
      label: "Final Registration",
      content: (
        <FinalRegistration
          useForm={useFinalRegistrationForm}
          email={useSendOTPForm.getValues("email")}
          otp={otp}
          reset={reset}
        />
      ),
      icon: GrDocumentVerified,
    },
  ];

  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Stack placeItems="center" py="10">
          <Heading size="lg" mb="3" textAlign="center">
            Register your account
          </Heading>
          <Flex flexDir="column" width="100%">
            <Steps activeStep={activeStep} mb="4">
              {steps.map(({ label, content, icon }) => (
                <Step label={label} key={label} icon={icon}>
                  {content}
                </Step>
              ))}
            </Steps>
          </Flex>
        </Stack>
      </CenterContainer>
    </MainContainer>
  );
};

export default Register;
