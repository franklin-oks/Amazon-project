import {cart, removeFromCart, updateDeliveryOption} from "../../data/cart.js";
// we need to import the products here such that our productId can search and get other details like name etc
import {products, getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryoption.js';
import { renderPaymentSummary } from "./paymentSummary.js";


// using dayjs external library for date and time calculation
// first load the dayjs script at the html or best import as module, then come here, call dayjs(); function
// console.log(dayjs());, dayjs has add method that takes two arguments
// 1) the number of time we want to add, e.g 7 days = 7, 2)length of time we want, for 7 days = "days"
// or 7 'months' or 8 'years' etc.

const today = dayjs();
const deliveryDate7Days = today.add(7, 'days');
// console.log(deliveryDate7Days);
// will give you seven days from today, to format the date in a readable way
console.log(deliveryDate7Days.format('dddd, MMMM D YYYY' ));  //check dayjs documentation for date formating

export function renderOrderSummary() {

        let cartSummaryHTML = " ";


        cart.forEach((cartItem) =>{

            const productId = cartItem.productId;

            const matchingProduct = getProduct(productId);        

           
            // console.log(matchingProduct);  //to see if all the details of a product is gotten


            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = getDeliveryOption(deliveryOptionId);

            
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dayString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML +=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dayString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
                
                </div>
            </div>
            </div>
            `;
        // console.log(cartSummaryHTML);
            
        });

        const mainCart = document.querySelector('.js-order-summary');
        mainCart.innerHTML = cartSummaryHTML;

        // generating html for the delivery options
        function deliveryOptionsHTML(matchingProduct, cartItem){
            let html = " ";
            deliveryOptions.forEach((deliveryOption) =>{
                const today = dayjs();
                const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
                const dayString = deliveryDate.format('dddd, MMMM D');

                const priceString = deliveryOption.priceCents === 0 ? "Free" : 
                `$${formatCurrency(deliveryOption.priceCents)} -`;

        // for the check box
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
                <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked': ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                    ${dayString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping 
                    </div>
                    </div>
                </div>
                `
            });
        return html
        }


        // deleting from a cart by selecting all the delete buttons
        // we save a particular id to the delete button using data set
        const deleteButtons = document.querySelectorAll('.js-delete-link');
        deleteButtons.forEach((button) =>{
            button.addEventListener("click",() =>{
            const productId = button.dataset.productId;
            //   console.log(productId);
            removeFromCart(productId);  
            //   console.log(cart);

            
            // to remove the html cart once a delete  button is pressed,
            // 1) by giving a special class to the product container with its productId
            // getting the element to be removed. eventListener has remove property
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            console.log((container));
            container.remove();
            
            renderPaymentSummary();
            });
        });

        // updating delivery option, so that when checked, the delivery date is updated
        document.querySelectorAll('.js-delivery-option').forEach((element) =>{
        element.addEventListener('click',()=>{
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
        });

}





// NB: external library is best used with module to avoid naming conflict, we use
// EcmaScript version Module