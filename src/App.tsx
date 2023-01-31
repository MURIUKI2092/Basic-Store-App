import React, { useState } from "react";
import { useQuery } from "react-query";
//components
import Product from "./products/products";
//@materialUI components
import logo from "./logo.svg";
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

//styles
import { Wrapper, StyledButton } from "./App.styles";
//types
export type CartItemType = {
  id: string;
  category: string;
  price: number;
  title: string;
  description: string;
  image: string;
  amount: number;
};

const getProduct = async (): Promise<CartItemType[]> =>
  await (await fetch("http://fakestoreapi.com/products")).json();

const handleAddToCart = (selectedItem: CartItemType) => {
  return null;
};

const getTotalItems = (items: CartItemType[]) => {
  return items.reduce((acc: number, items) => acc + items.amount, 0);
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProduct
  );
  console.log(data);

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <div>Something went wrong</div>;
    console.log(error);
  }
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cartr goes here
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartProducts)}>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Product item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
