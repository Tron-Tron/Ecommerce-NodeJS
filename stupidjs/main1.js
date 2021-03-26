//phan biet undefined: khi dinh nghia 1 bien nhung k gan gia tri, null
//is not defined: la bien khong duoc dinh nghia
//let hello;
// console.log("hello", hello);

// var hello = 10;
//hoisting trong javascript: bien khai bao bang var va function (chu ko gan gia tri)bang var se duoc dua len dau(var hello) nen bien hello se la undefined
//hoisting trong function cua javacript:

//=======function declaration
// hello();
// function hello() {
//   console.log("ok");
// }

//==========function expression(var let const) dinh nghia 1 bien co gia tri la 1 function
var ok = function () {};

//=======arrow function

//======currying function
// const add = (a) => {
//   return (b) => {
//     return a + b;
//   };
// };

// const add = (a) => {
//   return (b) => {
//     return (c) => {
//       return a + b + c;
//     };
//   };
// };
// console.log(add(7)(10)(20)); //

//========Closure function/inner function:
// const counter = () => {
//   let count = 1;
//   //closure function: la f nam ben trong f khac, su dung bien nam ben ngoai f do
//   return () => {
//     console.log(count);
//     count++;
//   };
// };

// const count = counter();//count la function
// count();
// count();
// count();
// count();

//=========event loop

//nodejs chay single thread: tai 1 thoi diem chi co 1 dong code dc chay

//sync chay tu tren xuong duoi: dong bo=> tien trinh nay chay xong thi tien trinh khac moi chay
console.log("1");

//async: bat dong bo:tien trinh nay chay chua tre ve kq ma tien trinh khac da chay roi
//dung await de doi cai nay chay xong moi viet, luc nao cungx dat truoc 1 promise
//la 1 web api thong dung: setTimeout, setInterval
// setTimeout(() => {
//   console.log("2");
// }, 3000);
// setTimeout(() => {
//   console.log("2");
// }, 1000);

// console.log("3");
//callback
//promise
//file

//===promise
const promise1 = () => {
  return new Promise((resolve, reject) => {
    resolve("ok1");
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    resolve("ok2");
  });
};

promise1().then((data) => console.log(data));
promise2().then((data) => console.log(data));

//chay nhieu cai promise cung luc
Promise.all([promise1(), promise2()]).then((data) => console.log(data));
//su dung de goi promise doc lap voi nhau
