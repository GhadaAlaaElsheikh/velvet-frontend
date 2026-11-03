import { CartItem } from "@/context/CartContext";

export function calculateCartPricing(cart: CartItem[]) {
   const isGiftBagItem = (item: CartItem) =>
    item.product.isGiftBag ||
    item.product.name?.trim().toLowerCase() === "velvet gift bag";

  const eligibleUnits = cart.reduce((total, item) => {
    const category = item.product.category?.trim().toLowerCase()
       

    const isEligibleCategory = [
      "perfumes",
      "luxury perfumes",
    ].includes(category || "");

    const is60ml =
      item.size.replace(/\s/g, "").toLowerCase() === "60ml";

    return total +
      (isEligibleCategory && is60ml && !item.product.isGiftBag
        ? item.quantity
        : 0);
  }, 0);

  let bundleUnitsRemaining =
    Math.floor(eligibleUnits / 5) * 5;

  let subtotal = 0;
  let originalSubtotal = 0;

  const items = cart.map((item) => {
       const isGiftBag = isGiftBagItem(item);
      const originalPrice = isGiftBag ? 300 : item.price;
    let finalPrice: number;

    originalSubtotal += originalPrice * item.quantity;

    if (isGiftBag) {
      finalPrice = 300;
    } else {
      const category = item.product.category
        ?.trim()
        .toLowerCase();

      const isEligibleCategory = [
        "perfumes",
        "luxury perfumes",
      ].includes(category || "");

      const is60ml =
        item.size.replace(/\s/g, "").toLowerCase() === "60ml";

      const isEligible =
        isEligibleCategory && is60ml;

      let bundleQuantity = 0;

      if (isEligible) {
        bundleQuantity = Math.min(
          item.quantity,
          bundleUnitsRemaining,
        );

        bundleUnitsRemaining -= bundleQuantity;
      }

      const remainingQuantity =
        item.quantity - bundleQuantity;

      finalPrice =
        (bundleQuantity * 200 +
          remainingQuantity * originalPrice * 0.8) /
        item.quantity;
    }

    const lineTotal = Number(
      (finalPrice * item.quantity).toFixed(2),
    );

    subtotal += lineTotal;

    return {
      ...item,
      finalPrice: Number(finalPrice.toFixed(2)),
      lineTotal,
    };
  });

  return {
    items,
    subtotal: Number(subtotal.toFixed(2)),
    originalSubtotal: Number(originalSubtotal.toFixed(2)),
    savings: Number((originalSubtotal - subtotal).toFixed(2)),
    shipping: cart.length > 0 ? 40 : 0,
    total: Number((subtotal + (cart.length > 0 ? 40 : 0)).toFixed(2)),
  };
}