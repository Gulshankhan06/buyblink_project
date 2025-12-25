export function getCart(){ return JSON.parse(localStorage.getItem("buyblink_cart") || "[]"); }
export function addToCart(product){
  const cart = getCart();
  cart.push(product);
  localStorage.setItem("buyblink_cart", JSON.stringify(cart));
  alert(product.name + " added to cart");
}
export function removeFromCart(id){
  const cart = getCart().filter(p => (p._id || p.name) !== id);
  localStorage.setItem("buyblink_cart", JSON.stringify(cart));
}
