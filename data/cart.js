export const cart = [
  {
    // create a default item for the check out.NB: the image is not been saves
    // bcos from the productId we can get the name,price and etc
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  },
];


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