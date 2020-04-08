let rNum = Math.floor(Math.random() * 26 + 97);
//26 letters in the alphabet
//97 is where the alphabet starts
let rChar = String.fromCharCode(rNum); //
rChar;
rNum;
// https://www.w3schools.com/charsets/ref_html_ascii.asp

/* Charcode

 *
 *
 *
 */
const upperCaseLetters = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const lowerCaseLetters = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
const randomNumbers = () => {};
const specialCharacters = () => {
  // 33-64
};
