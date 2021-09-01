import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id === +match.params.id);
  return (
    <>
      <Flex mb="5">
        <Button as={RouterLink} to="/" colorScheme="gray">
          Go Back
        </Button>
      </Flex>
      <Grid
        templateColumns={{ sm: "1fr", md: "2fr 1fr ", lg: "5fr 4fr 3fr" }}
        gap="10"
      >
        {/* col 1*/}
        <Image src={product.image} alt={product.name} borderRadius="md" />
        {/* col 2 */}
        <Flex direction="column">
          <Heading as="h6" fontSize="base" color="gray.500">
            {product.brand}
          </Heading>
          <Heading as="h2" fontSize="4xl">
            {product.name}
          </Heading>
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
          <Heading
            as="h5"
            my="5"
            fontSize="4xl"
            fontWeight="medium"
            color="teal.600"
          >
            ${product.price}
          </Heading>
          <Text>{product.description}</Text>
        </Flex>
        {/* col 3 */}
        <Flex direction="column">
          <Flex justifyContent="space-between" py="2">
            <Text>Price:</Text>
            <Text fontWeight="bold">${product.price}</Text>
          </Flex>
          <Divider />
          <Flex justifyContent="space-between" py="2">
            <Text>Status:</Text>
            <Text fontWeight="bold">
              {product.countInStock > 0 ? "In Stock" : "Not Available"}
            </Text>
          </Flex>
          <Divider />
          <Button
            bgColor="gray.800"
            textTransform="uppercase"
            letterSpacing="wide"
            colorScheme="teal"
            my="2"
            disabled={product.countInStock === 0}
          >
            Add to cart
          </Button>
        </Flex>
      </Grid>
    </>
  );
};

export default ProductScreen;
