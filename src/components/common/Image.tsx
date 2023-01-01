import React from "react";
import { Image as ImageComponent, ImageProps } from "@chakra-ui/react";

import { imageFallbackUrl } from "../../config/url";

const Image = (props: ImageProps) => {
  return (
    <ImageComponent
      {...props}
      alt={props?.alt || "image"}
      fallbackSrc={imageFallbackUrl}
    />
  );
};

export default Image;
