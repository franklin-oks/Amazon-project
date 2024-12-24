// OOP (object oreinted programming) is another style of programming where we group our code
// into objects mimicking the real life.
// NB: the other ones we have been using is called procedural programming (ie a step by step
// set of instructions, ie grouping our code in different function),
// OOP makes it easy to create multiple objects


const cart = {

 cartItems: undefined,

  loadFromStorage(){
    this.cartItems =  JSON.parse(localStorage.getItem('cart-oop'));
  
  if (!this.cartItems){
    
    this.cartItems = [
      {
      
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
  },

  saveToStorage(){
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
   },

   addToCart(productId){
    matchingItem = undefined;

    this.cartItems.forEach((cartItem) =>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity += 1;

    }else{
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
},


removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem) =>{
      if (cartItem.productId !== productId){
  
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
  this.saveToStorage();
  },


  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
      this.cartItems.forEach((cartItem) =>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
  matchingItem.deliveryOptionId = deliveryOptionId;
  this.saveToStorage(); 
  }
   
};

cart.loadFromStorage();


const bussinessCart = {

    cartItems: undefined,
   
     loadFromStorage(){
       this.cartItems =  JSON.parse(localStorage.getItem('bussinessCart'));
     
     if (!this.cartItems){
       
       this.cartItems = [
         {
         
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
     },
   
     saveToStorage(){
       localStorage.setItem('businessCart', JSON.stringify(this.cartItems));
      },
   
      addToCart(productId){
       matchingItem = undefined;
   
       this.cartItems.forEach((cartItem) =>{
         if(productId === cartItem.productId){
           matchingItem = cartItem;
         }
       });
   
       if(matchingItem){
         matchingItem.quantity += 1;
   
       }else{
         this.cartItems.push({
           productId: productId,
           quantity: 1,
           deliveryOptionId: '1'
         });
       }
       this.saveToStorage();
   },
   
   
   removeFromCart(productId){
       const newCart = [];
     
       this.cartItems.forEach((cartItem) =>{
         if (cartItem.productId !== productId){
     
           newCart.push(cartItem);
         }
       });
       this.cartItems = newCart;
     this.saveToStorage();
     },
   
   
     updateDeliveryOption(productId, deliveryOptionId) {
       let matchingItem;
     
         this.cartItems.forEach((cartItem) =>{
           if(productId === cartItem.productId){
             matchingItem = cartItem;
           }
         });
     matchingItem.deliveryOptionId = deliveryOptionId;
     this.saveToStorage(); 
     }
      
   };


bussinessCart.loadFromStorage();

   console.log(bussinessCart);
   





