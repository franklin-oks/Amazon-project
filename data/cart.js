export const cart = [];


export function addToCart(productId){
    // to check if a product already exists in a cart by looping through the cart and ckeck
    // matching item
    let matchingItem;

    cart.forEach((cartItem) =>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity += 1;

    }else{
      cart.push({
        productId: productId,
        quantity: 1
      });
    }
}