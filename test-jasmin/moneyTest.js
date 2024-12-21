import { formatCurrency } from "../scripts/utils/money.js";

describe('test suit: formatCurrency', ()=>{
  it('convert cents to dollars', ()=>{

    expect(formatCurrency(2095)).toEqual('20.95');
  });

//   another test case
   it('works with zero',()=>{
      expect(formatCurrency(0)).toEqual('0.00');
   });

   it('round up to nearest cent', ()=>{
     expect(formatCurrency(2000.5)).toEqual('20.01');
   });
});