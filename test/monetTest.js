// lets import formatCurrency code in other to test it using automated testing

import { formatCurrency } from "../scripts/utils/money.js";

// formatCurrency converts cents to dollars, we passed 2095 in cents to see if it can
// give us 20.95 which is its equivalent in dollars

console.log('test suit: formatCurrency');

console.log('converts 2095 cents to dollars');
if (formatCurrency(2095) === '20.95'){
    console.log('passed');
    
} else{
    console.log('failed');
    
}
// another test case
console.log('converts 0 cents to dollars');
if (formatCurrency(0) === '0.00'){
    console.log('passed');
    
} else{
    console.log('failed');
    
}
// another test case
console.log('converts 2000.5 cents to dollars');
if (formatCurrency(2000.5) === '20.01'){
    console.log('passed');  
}else{
    console.log('failed');
    
}