import { Heading, Grid } from "@chakra-ui/react";
import Product from "../components/Product";
import products from "../products";

const HomeScreen = () => {
  return (
    <>
      <Heading as="h2" mb="8" fontSize="3xl">
        Latest Products
      </Heading>
      <Grid
        templateColumns={{ md: "1fr 1fr", sm: "1fr", lg: "repeat(4,1fr)" }}
        gap="8"
      >
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </Grid>
    </>
  );
};

export default HomeScreen;
