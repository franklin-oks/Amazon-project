// to get item form the cart
export let cart;

loadFromStorage();
export function loadFromStorage(){
  cart =  JSON.parse(localStorage.getItem('cart'));

if (!cart){
  
  cart = [
    {
      // create a default item for the check out.NB: the image is not been saves
      // bcos from the productId we can get the name,price and etc
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    },
  ];
}

}


// to create a function to save the cart in the localStorage instead of in object above
function saveToStorage(){
 localStorage.setItem('cart', JSON.stringify(cart));
}


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
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    saveToStorage();
}

// to remove item from cart, we can 1)create a new array, 2)loop through the array and 
// 3)outputs all except the deleted one
 export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) =>{
    if (cartItem.productId !== productId){

      newCart.push(cartItem);
    }
  });
  // update the already to the newCart with removed item( NB: change const cart above to let cart)
  cart = newCart;
saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

    cart.forEach((cartItem) =>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
matchingItem.deliveryOptionId = deliveryOptionId;
saveToStorage(); 
}