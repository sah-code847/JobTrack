const bills = [100, 500, 200, 800, 300];

const maxValue = bills.reduce((acc,max)=>{
return max > acc ? max : acc;
return acc;
},bills[0]);
console.log(maxValue);
