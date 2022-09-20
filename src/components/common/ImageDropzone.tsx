import {
  Avatar,
  Box,
  FormLabel,
  HStack,
  Image,
  Stack,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getImgLink } from "../../utils/helper";

/*eslint-disable */

interface DropzoneComponentProps {
  defaultValue: any;
  file: any;
  setFile: any;
  formLabel: string;
}

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  defaultValue,
  file,
  setFile,
  formLabel,
}) => {
  const toast = useToast();
  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      setFile(acceptedFiles[0]);
      if (rejectedFiles[0]) {
        if (rejectedFiles[0]?.errors[0].code === "file-invalid-type") {
          toast({
            title: "Please upload valid image!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }

        if (rejectedFiles[0]?.errors[0].code === "file-large-size") {
          toast({
            title: rejectedFiles[0]?.errors[0].message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    },
    [setFile, toast]
  );

  const fileValidator = (file: any) => {
    if (file.size > 5000000) {
      return {
        code: "file-large-size",
        message: `Image size must not exceed 5MB`,
      };
    }

    return null;
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/.jpeg": [".jpeg"],
        "image/.jpg": [".jpg"],
        "image/png": [".png"],
      },
      validator: fileValidator,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      <HStack spacing="10" py="5">
        <Box>
          <FormLabel>{formLabel}</FormLabel>
          <Avatar
            bg="gray.200"
            src={file ? URL.createObjectURL(file) : getImgLink(defaultValue)}
            size="2xl"
          />
        </Box>
        <Box style={{ ...style, flexDirection: "row" }}>
          <Text fontWeight={"bold"} fontSize="lg" textAlign="center">
            Drag and drop your image or click to select
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default DropzoneComponent;
