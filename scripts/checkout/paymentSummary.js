import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryoption.js";
import { formatCurrency } from "../utils/money.js";


export function renderPaymentSummary() {
//to calculate each product price by its quantity
let productPriceCents = 0; 
let shippingPriceCents = 0;  

cart.forEach((cartItem) =>{ 
   const product = getProduct(cartItem.productId);
   productPriceCents += product.priceCents * cartItem.quantity;


//    for shipping cost
   const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
   shippingPriceCents += deliveryOption.priceCents;
});

// total items price with shipping price
const totalBeforeTax = productPriceCents +shippingPriceCents;

// to calculate 10% tax of the total payment
const taxCents = totalBeforeTax * 0.1;
const grandTotalCents = totalBeforeTax + taxCents;

const paymentSummaryHTML = `
 <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTax)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(grandTotalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`
const payment = document.querySelector('.js-payment-summary');
payment.innerHTML = paymentSummaryHTML;
}

// renderPaymentSummary();
