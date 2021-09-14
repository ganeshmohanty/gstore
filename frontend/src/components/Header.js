import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Heading, Link, Box, Icon } from "@chakra-ui/react";
import { HiShoppingBag, HiUser, HiOutlineMenuAlt3 } from "react-icons/hi";

const MenuItems = ({ children, url }) => {
  return (
    <Link
      as={RouterLink}
      to={url}
      mt={{ base: 4, md: 0 }}
      fontSize="sm"
      letterSpacing="wide"
      color="whiteAlpha.600"
      textTransform="uppercase"
      mr="5"
      display="block"
      _hover={{ color: "whiteAlpha.800" }}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py="6"
      px="6"
      wrap="wrap"
      bgColor="gray.800"
      w="100%"
      top="0"
      pos="fixed"
      zIndex="2"
    >
      <Flex align="center" mr="5">
        <Heading
          as="h1"
          color="whiteAlpha.800"
          fontWeight="bold"
          size="md"
          letterSpacing="md"
        >
          <Link
            as={RouterLink}
            to="/"
            _hover={{ color: "whiteAlpha.700", textDecor: "none" }}
            textTransform="uppercase"
          >
            RST Store
          </Link>
        </Heading>
      </Flex>
      <Box
        display={{ base: "block", md: "none", sm: "block" }}
        onClick={() => setShow(!show)}
      >
        <Icon as={HiOutlineMenuAlt3} color="white" w="6" h="6" />
        <title>Menu</title>
      </Box>
      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
      >
        <MenuItems url="/cart">
          <Flex alignItems="center">
            <Icon as={HiShoppingBag} w="4" h="4" mr="1" />
            cart
          </Flex>
        </MenuItems>
        <MenuItems url="/">
          <Flex alignItems="center">
            <Icon as={HiUser} w="4" h="4" mr="1" />
            login
          </Flex>
        </MenuItems>
      </Box>
    </Flex>
  );
};

export default Header;
