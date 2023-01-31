// @material IU components
import { Button } from "@mui/material";
//types
import { CartItemType } from "../App";
//styles
import { Container } from "./Products.styles";
//types

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};
const Product: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Container>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
        </div>
        <Button onClick={()=> handleAddToCart(item)}>Add To Cart</Button>
  </Container>
);

export default Product;
