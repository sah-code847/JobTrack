const newArray=(arr)=>{
let result=arr.filter((value)=>value.age>=18);
return result;
}
console.log(newArray([  { name: "A", age: 17 },
  { name: "B", age: 25 },
  { name: "C", age: 30 },
  { name: "D", age: 16 },
  { name: "E", age: 22 }]));
