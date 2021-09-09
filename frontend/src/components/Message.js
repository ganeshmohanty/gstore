import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const Message = ({ type = "info", children }) => {
  return (
    <Alert status={type}>
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};

export default Message;
