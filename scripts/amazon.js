  import { cart } from "../data/cart.js";
  import { products } from "../data/products.js";
  // import { cart as myCart } from "../data/cart";
  // to avoid naming conflict we do as above, cart is now myCart


let productsHTML = " ";
products.forEach(({id,image,name,rating:{stars,count},priceCents}) =>{
    productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${count}
                    </div>
                </div>

                <div class="product-price">
                    $${(priceCents / 100).toFixed(2)}
                </div>

                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${id}">
                    Add to Cart
                </button>
                </div>
            `; 
});

// console.log(productsHTML);

const productsContainer = document.querySelector('.js-products-grid');
productsContainer.innerHTML = productsHTML;

// to addeventlistener to the button

const buttonsEl = document.querySelectorAll('.js-add-to-cart');
// console.log(buttonsEl);
buttonsEl.forEach((button) =>{
  button.addEventListener('click',() =>{
    const productId = button.dataset.productId;


// to check if a product already exists in a cart by looping through the cart and ckeck
// matching item
let matchingItem;

cart.forEach((item) =>{
  if(productId === item.productId){
    matchingItem = item;
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

// to make the cart icon count the total items
let cartQuantity = 0;
cart.forEach((item) =>{
  cartQuantity += item.quantity
})

// add the quantity to the cart icon
const cartBtn = document.querySelector('.js-cart-quantity');
cartBtn.innerHTML = cartQuantity;
  
  });
});
