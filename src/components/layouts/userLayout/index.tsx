import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../../../contexts/auth";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user?.role === "admin") {
    router.push("/admin");
    return <>Not Authorized</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
