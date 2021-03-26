//regular expression ==> regex

//=>> xu li chuoi. string

//const demo = "1qqq";

// //kiem tra xem chuoi co chu l hay khong()

// for (let i = 0; i < demo.length; i++) {
//   if (demo[i] === "l") {
//     console.log("ok");
//     break;
//   }
// }
// //indexOf
// console.log(demo.indexOf("l"));
// //includes co phan biet chu hoa va chu thuong
// console.log(demo.includes("l"));

//const regex = /\D/;
//console.log(regex.test(demo));
//ktra string co chu 'o'hoac chu 'l' hay ko thi dung dau |
//==> regex = /o|l/

//ktra  'ol' hoac 'or' ==>/ol||or/

//ktra string co it nhat 1 ki tu alphabet hay khong  /[a-z]/
//=> regex = /[a-z]/g  hoac /[a-zA-Z]/g  (ca hoa va thuong)
//ktra string co it nhat 1 so hay khog /[0-9]/ hoac /\d/

// \d: digit kiem tra so(co ton tai ki tu la so)
// \D: not digit  khong phai so(ton tai ki tu khong phai so)
// \w: word(tinh luon ca chu va so ma khong phai la ki tu dac biet)
// \W: not word
// \s: space
// \S: no space
// $: ket thuc bang cai gi do
// ^: bat dau bang cai gi
// [^..]: ktra not (phu dinh)

//quy dinh ket thuc = @gmail.com
//const email = "123@gmail.com";
//const regex = /@gmail.com$/;

// ket thuc bang gmal.com hoac yahoo.com
//const regex = /(@gmail.com|@yahoo.com)$/;
//console.log(regex.test(phone));

//====KTRA SO DIEN THOAI
//quy dinh: sdt bat dau bang 034 hoac 035

const phone = "05464";
// const regex = /^(034|035)/;
// console.log(regex.test(phone));

//=============================

const blacklist = ["0", "1", "2"];
//ktra trong phone co ton tai so trong mang blackist k, ton tai tra ve false
//==cach 1
//const regex = new RegExp(blacklist.join("|"));
//console.log(!regex.test(phone));
//const regex = /[^012]/; // khong ton tai ki tu 0 hoac 1 hoac 2
//==cach 2
// const regex = new RegExp(`[^${blacklist.join()}]`);
// console.log(regex.test(phone));

//////////////MAP
// const demo = "hello world";
// const regex = /hello/g;
// //g: global  => co /g thoa man regex
// .: thoa man 1 ki tu
// ? : 0 hoac 1 ki tu
// *: 0 hoac nhieu
// + : 1 hoac nhieu

// console.log(demo.match(regex));

// const demo = " abcd123";
// const regex = /.at/g;
// console.log(demo.match(regex));
const demo1 = " abcd"; //true
const demo2 = " abcd123"; //false
const demo3 = "123123"; //false

const regex = /[^a-z]+/g;
console.log(regex.test(demo2));
