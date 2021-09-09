import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  Button,
  Divider,
  Select,
} from "@chakra-ui/react";

import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  //const product = products.find((p) => p._id === +match.params.id);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <>
      <Flex mb="5">
        <Button as={RouterLink} to="/" colorScheme="gray">
          Go Back
        </Button>
      </Flex>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
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
            {product.countInStock > 0 && (
              <Flex justifyContent="space-between" py="2">
                <Text>Qty:</Text>
                <Select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  width="30%"
                >
                  {[...Array(product.countInStock).keys()].map((i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
            )}
            <Button
              onClick={addToCartHandler}
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
      )}
    </>
  );
};

export default ProductScreen;
