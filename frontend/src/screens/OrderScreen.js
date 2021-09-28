import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
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
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, currItem) => acc + currItem.price * (currItem.qty || 1),
      0
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history]);

  const successPaymentHandler = (paymentResult) => {
    console.log("THIS IS THE PAYMENT RESULT OBJECT", paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

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

            {!order.isPaid && (
              <Box>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </Box>
            )}

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <Button
                  type="button"
                  colorScheme="teal"
                  onClick={deliverHandler}
                >
                  Mark as delivered
                </Button>
              )}
          </Flex>
        </Grid>
      </Flex>
    </>
  );
};

export default OrderScreen;
