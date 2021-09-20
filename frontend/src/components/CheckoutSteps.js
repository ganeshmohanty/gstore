import { Link as RouterLink } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react';
import { IoCaretForwardSharp } from 'react-icons/io5';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Flex justifyContent="center" mb="8">
      <Breadcrumb separator={<IoCaretForwardSharp color="gray.500" />}>
        <BreadcrumbItem>
          {/* Step 1 */}
          {step1 ? (
            <BreadcrumbLink>Login</BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              disabled
              color="gray.400"
              _hover={{ textDecor: 'none' }}
            >
              Login
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        <BreadcrumbItem>
          {/* Step 2 */}
          {step2 ? (
            <BreadcrumbLink as={RouterLink} to="/shipping">
              Shipping
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              disabled
              color="gray.400"
              _hover={{ textDecor: 'none' }}
            >
              Shipping
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        <BreadcrumbItem>
          {/* Step 3 */}
          {step3 ? (
            <BreadcrumbLink as={RouterLink} to="/Payment">
              Payment
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              disabled
              color="gray.400"
              _hover={{ textDecor: 'none' }}
            >
              Payment
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        <BreadcrumbItem>
          {/* Step 4 */}
          {step4 ? (
            <BreadcrumbLink as={RouterLink} to="/placeorder">
              Place Order
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              disabled
              color="gray.400"
              _hover={{ textDecor: 'none' }}
            >
              Place Order
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};

export default CheckoutSteps;
