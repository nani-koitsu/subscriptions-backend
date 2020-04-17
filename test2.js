// // console.log(newfileName[0]);

// let str =
//   "https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/disneyplus.png";
// // function splitThis(str) {
// //   //
// //   let fileName = str.split("/").pop();
// //   let newFileName = fileName.split(".");
// //   return newFileName[0];
// // }
// // splitThis(str); //
// // console.log(splitThis(str)); //
// let result = str.match(/(?<=logos\/)(.*)(?=.png)/gi); //
// console.log(result);

// const fetch = require('node-fetch')

// fetch('https://api.ipify.org?format=json')
//   .then(results => results.json())
//   .then(data => console.log(data.ip))


// fetch('https://api.ipgeolocationapi.com/geolocate')
//   .then(results => results.json())
//   .then(data => console.log(data))

// let arr = [];
// let name = 'Jimmy Lai'

// function splitter(name) {
//   let splitName = name.split('')
//   arr = splitName
//   console.log(arr)
//   return arr
// }
// splitter(name) //
// console.log(arr)

// let str = "I am a hacker"
// let character = 'a'

// function charCounter(str, character) {
//   let charCount = 0;
//   let strSplitter = str.split("") //
//   for (let i = 0; i < strSplitter.length; i++) {

//     if (strSplitter[i] === character) {
//       charCount++
//       console.log(charCount) //
//     }
//   }
// }
// charCounter(str)

let str = 'Radagast the Brown'
function getAllWords(str) {
  return str.split(" ")
}
console.log(getAllWords(str))
