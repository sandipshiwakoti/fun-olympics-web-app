import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import * as jose from "jose";
import { getProfile, login as loginUser } from "../api/api";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  login: (payload: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getProfile();
      setUser({ ...data });
    } catch (e) {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (payload: any) => {
    setIsLoading(true);
    const response = await loginUser(payload);
    if (response.data?.accessToken) {
      toast({
        title: response.message || "Successfully logged into the system!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      Cookies.set("token", response.data.accessToken);
      fetchUser();

      if (response.data.role === "user") {
        router
          .replace({
            pathname: "/games",
          })
          .then(() => router.reload());
      } else if (response.data.role === "admin") {
        router.reload();

        router.replace({
          pathname: "/admin",
        });
      }
    } else {
      toast({
        title: response.message || "Unauthorized!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      Cookies.set("token", "");
      fetchUser();
    }
    setIsLoading(false);
  };

  const logout = (): void => {
    toast({
      title: "Successfully loggged out!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    Cookies.remove("token");
    setUser(null);
    router.reload();
    router.replace({
      pathname: "/auth/login",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        isLoading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextProps;
