import { Flex, Text } from "@chakra-ui/react";
let date = new Date();
const Footer = () => {
  return (
    <Flex as="footer" justifyContent="center" py="5">
      <Text>Copyright {date.getFullYear()}.G-Store. All Rights Reserved.</Text>
    </Flex>
  );
};

export default Footer;
