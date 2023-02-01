//@mui components
import { Button } from "@mui/material";
import { isTemplateExpression } from "typescript";
//types
import { CartItemType } from "../App";
//styles
import { CartItemsWrapper } from "./CartItem.styles";

//props
type Props = {
  item: CartItemType;
  addToCart: (selectedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <CartItemsWrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total :${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
          </div>
          <img src={item.image} alt={item.title}/>
    </CartItemsWrapper>
  );
};

export default CartItem;
