import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Grid } from "@chakra-ui/react";

import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  console.log(products);

  useEffect(() => {
    dispatch(listProducts());
  }, []);
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
