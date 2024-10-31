import { CartItems } from '../redux/cartSlice';

export const calcTotalPrice = (items: CartItems[]) => {
  return items.reduce((acc, obj) => {
    return obj.price * obj.count + acc;
  }, 0);
};
