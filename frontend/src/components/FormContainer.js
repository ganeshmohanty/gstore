import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width = "xl" }) => {
  return (
    <Flex
      direction="column"
      boxShadow="md"
      rounded="md"
      p="10"
      width={width}
      bgColor="white"
    >
      {children}
    </Flex>
  );
};

export default FormContainer;
