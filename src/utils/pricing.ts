
import { CartItem } from "@/context/CartContext";

export function calculateCartPricing(cart: CartItem[]) {
  const items = cart.map((item) => {
    const finalPrice = item.price;

    const lineTotal = Number(
      (finalPrice * item.quantity).toFixed(2)
    );

    return {
      ...item,
      finalPrice,
      lineTotal,
    };
  });

  const subtotal = items.reduce(
    (total, item) => total + item.lineTotal,
    0
  );

  const shipping = cart.length > 0 ? 40 : 0;

  return {
    items,
    subtotal: Number(subtotal.toFixed(2)),
    shipping,
    total: Number((subtotal + shipping).toFixed(2)),
  };
}
