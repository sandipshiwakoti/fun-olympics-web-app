import { Image } from "@chakra-ui/react";

interface LogoProps {
  color?: "dark" | "light";
  size: "xs" | "sm" | "md" | "lg" | "xl";
  withoutName?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size, color, withoutName }) => {
  let width, src;

  if (size === "xs") width = "60px";
  else if (size === "sm") width = "100px";
  else if (size === "md") width = "150px";
  else if (size === "lg") width = "200px";
  else if (size === "xl") width = "300px";

  if (color === "light") src = "/logo-white.svg";
  if (color === "dark") src = "/logo.svg";

  if (withoutName) src = "/logo-img.svg";

  return <Image w={width} h="100px" src={src} alt="Logo" />;
};

export default Logo;
