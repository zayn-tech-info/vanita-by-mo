import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSessionId } from "./useSessionId";

export function useCart() {
  const sessionId = useSessionId();
  const cartItems = useQuery(api.cart.getCart, { sessionId }) ?? [];
  const cartCount = useQuery(api.cart.getCartCount, { sessionId }) ?? 0;
  const addToCartMutation = useMutation(api.cart.addToCart);
  const updateQuantityMutation = useMutation(api.cart.updateQuantity);
  const removeFromCartMutation = useMutation(api.cart.removeFromCart);
  const clearCartMutation = useMutation(api.cart.clearCart);

  const addToCart = async (product, quantity = 1, size, color) => {
    // For image, we need to convert the imported module path to a string
    const imageStr =
      typeof product.image === "string"
        ? product.image
        : product.image?.default || String(product.image);

    await addToCartMutation({
      sessionId,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: imageStr,
      category: product.category,
      quantity,
      size: size || undefined,
      color: color || undefined,
    });
  };

  const updateQuantity = async (id, quantity) => {
    await updateQuantityMutation({ id, quantity });
  };

  const removeItem = async (id) => {
    await removeFromCartMutation({ id });
  };

  const clearCart = async () => {
    await clearCartMutation({ sessionId });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
