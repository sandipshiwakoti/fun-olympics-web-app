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
  useToast,
} from "@chakra-ui/react";
import CenterContainer from "../../../components/common/CenterContainer";
import MainContainer from "../../../components/common/MainContainer";
import { useForm } from "react-hook-form";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "../../../hooks/useAuth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/auth";

type LoginPayload = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required.")
      .email("Email must be valid."),
    password: yup
      .string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters."),
  })
  .required();

const Login = () => {
  const { login, isLoading } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginPayload) => {
    // mutate(data);
    login(data);
  };

  return (
    <MainContainer bg="gray.100">
      <CenterContainer>
        <Stack placeItems="center" py="10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box bg="white" borderRadius="lg" p="10" w="500px">
              <Heading size="lg" mb="7" textAlign="center">
                Login to your account
              </Heading>
              <FormControl isInvalid={!!errors.email} mb="5">
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaEnvelope} color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Enter your email address"
                    {...register("email")}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password} mb="5">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaLock} color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Button
                colorScheme="blue"
                w="full"
                type="submit"
                isLoading={isLoading}
              >
                Login
              </Button>
            </Box>
          </form>
        </Stack>
      </CenterContainer>
    </MainContainer>
  );
};

export default Login;
