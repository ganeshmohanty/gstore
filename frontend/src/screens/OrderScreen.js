import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Box,
  Grid,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, currItem) => acc + currItem.price * (currItem.qty || 1),
      0
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <>
      <Flex w="full" py="5" direction="column">
        <Grid templateColumns="3fr 2fr" gap="20">
          <Flex direction="column">
            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
                Shipping
              </Heading>
              <Text>
                <strong>Name: </strong> {order.user.name}
              </Text>
              <Text>
                <strong>Email: </strong>{" "}
                <a
                  style={{ textDecoration: "underline" }}
                  href={`mailto:${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </Text>
              <Text>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </Text>
              {order.isDelivered ? (
                <Message type="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message type="error">Not Delivered</Message>
              )}
            </Box>

            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
                Payment Method
              </Heading>
              <Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Text>
              {order.isPaid ? (
                <Message type="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message type="error">Not Paid</Message>
              )}
            </Box>

            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
                Order Items
              </Heading>
              <Box>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <Box py="2">
                    {order.orderItems.map((item, index) => (
                      <Flex
                        key={index}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Flex py="2" alignItems="center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            w="12"
                            h="12"
                            objectFit="cover"
                            mr="6"
                          />
                          <Link
                            as={RouterLink}
                            to={`/product/${item.product}`}
                            fontWeight="medium"
                            fontSize="xl"
                          >
                            {item.name}
                          </Link>
                        </Flex>
                        <Text fontSize="lg" fontWeight="semibold">
                          {item.qty || 1} x ${item.price} = $
                          {(item.qty || 1) * item.price}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Flex>

          <Flex
            direction="column"
            bgColor="white"
            justifyContent="space-between"
            py="8"
            px="8"
            shadow="md"
            rounded="lg"
            borderColor="gray.300"
          >
            <Box>
              <Heading mb="6" as="h2" fontSize="3xl" fontWeight="bold">
                Order Summary
              </Heading>
              {/* Item prices */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Items</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ${order.itemsPrice}
                </Text>
              </Flex>
              {/* Shipping price */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Shipping</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ${order.shippingPrice}
                </Text>
              </Flex>
              {/* Tax price */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Tax</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ${order.taxPrice}
                </Text>
              </Flex>
              {/* Total price */}
              <Flex py="2" alignItems="center" justifyContent="space-between">
                <Text fontSize="xl">Total</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ${order.totalPrice}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Grid>
      </Flex>
    </>
  );
};

export default OrderScreen;
