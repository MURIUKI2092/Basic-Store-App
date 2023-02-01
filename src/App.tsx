import React, { useState } from "react";
import { useQuery } from "react-query";
//components
import Product from "./products/products";
import Cart from "./Cart/Cart";
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
  id: number;
  category: string;
  price: number;
  title: string;
  description: string;
  image: string;
  amount: number;
};

const getProduct = async (): Promise<CartItemType[]> =>
  await (await fetch("http://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProduct
  );
  console.log(data);
  const handleAddToCart = (selectedItem: CartItemType) => {
    setCartProducts(previous => {
      //check whether item is in the cart
      // if in cart add the item number
      const isItemInCart = previous.find((item) => item.id === selectedItem.id);

      if (isItemInCart) {
        return previous.map((item) =>
          item.id === selectedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //when item is first added

      return [...previous, { ...selectedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartProducts(previous =>
      previous.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((acc: number, items) => acc + items.amount, 0);
  };

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartProducts}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
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
