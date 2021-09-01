import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Image, Flex, Heading, Text } from "@chakra-ui/react";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecor: "none" }}
    >
      <Box
        maxW="sm"
        borderRadius="lg"
        overflow="hidden"
        bgColor="white"
        transition="all"
        _hover={{ shadow: "md" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          minH="360px"
          objectFit="cover"
        />
        <Flex py="5" px="4" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="3">
            {product.name}
          </Heading>
          <Flex alignItems="flex-end" justifyContent="space-between">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <Text fontSize="2xl" fontWeight="medium" color="blue.600">
              ${product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Product;
