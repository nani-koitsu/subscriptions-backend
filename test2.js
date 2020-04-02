// console.log(newfileName[0]);

let str =
  "https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/disneyplus.png";
// function splitThis(str) {
//   //
//   let fileName = str.split("/").pop();
//   let newFileName = fileName.split(".");
//   return newFileName[0];
// }
// splitThis(str); //
// console.log(splitThis(str)); //
let result = str.match(/(?<=logos\/)(.*)(?=.png)/gi); //
console.log(result);
