import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Text,
  Grid,
  Heading,
  Box,
  Image,
  Link,
  Select,
  Button,
  Icon,
} from "@chakra-ui/react";
import { IoTrashBinSharp } from "react-icons/io5";

import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Grid gridTemplateColumns="3">
      <Box>
        <Heading mb="8">Shopping Cart</Heading>
        <Flex>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty.{" "}
              <Link as={RouterLink} to="/">
                Go Back
              </Link>
            </Message>
          ) : (
            <Grid templateColumns="4fr 2fr" gap="10" w="full">
              <Flex direction="column">
                {cartItems.map((item) => (
                  <Grid
                    key={item.product}
                    size="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px"
                    borderColor="gray.200"
                    py="4"
                    px="2"
                    rounded="lg"
                    templateColumns="1fr 4fr 2fr 2fr 1fr"
                    _hover={{ bgColor: "gray.50" }}
                  >
                    {/* PRODUCT IMAGE */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      borderRadius="lg"
                      height="14"
                      width="14"
                      objectFit="cover"
                    />

                    {/* PRODUCT NAME */}
                    <Text fontWeight="semibold" fontSize="lg">
                      <Link as={RouterLink} to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Text>

                    {/* PRODUCT PRICE */}
                    <Text fontWeight="bold" fontSize="lg">
                      ${item.price}
                    </Text>

                    {/* QUANTITY SELECT BOX */}
                    <Select
                      value={item.qty}
                      width="20"
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Select>

                    {/* DELETE BUTTON */}
                    <Button
                      type="button"
                      colorScheme="red"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <Icon as={IoTrashBinSharp} />
                    </Button>
                  </Grid>
                ))}
              </Flex>

              <Flex
                direction="column"
                border="1px"
                borderWidth="2"
                borderColor="gray.200"
                rounded="md"
                padding="5"
                height="48"
                justifyContent="space-between"
              >
                <Flex direction="column">
                  <Heading as="h2" fontSize="3xl" mb="2">
                    Subtotal (
                    {cartItems.reduce(
                      (acc, currItem) => acc + (currItem.qty || 1),
                      0
                    )}{" "}
                    items)
                  </Heading>
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    color="blue.600"
                    mb="4"
                  >
                    $
                    {cartItems.reduce(
                      (acc, currItem) =>
                        acc + (currItem.qty || 1) * currItem.price,
                      0
                    )}
                  </Text>
                  <Button
                    type="button"
                    disabled={cartItems.length === 0}
                    size="lg"
                    colorScheme="teal"
                    bgColor="gray.800"
                    onClick={checkoutHandler}
                  >
                    Process to checkout
                  </Button>
                </Flex>
              </Flex>
            </Grid>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default CartScreen;
