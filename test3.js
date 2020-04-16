const resourceArr = Object.entries(results.resources);
let entries = [];
let subscriptionObj = new Object();
let subscriptionArr = [];
resourceArr.map(([key, value]) => {
  let secureUrl = value.secure_url;
  let logoName = secureUrl.match(/(?<=logos\/)(.*)(?=.png)/gi);

  subscriptionObj[logoName] = secureUrl;
  let entries = Object.entries(subscriptionObj);

});
console.log(entries);
