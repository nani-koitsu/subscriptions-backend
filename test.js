let results = {
  resources: [
    {
      public_id: "logos/adobe",
      format: "png",
      version: 1585753401,
      resource_type: "image",
      type: "upload",
      created_at: "2020-04-01T15:03:21Z",
      bytes: 15757,
      width: 250,
      height: 250,
      access_mode: "public",
      url:
        "http://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/adobe.png",
      secure_url:
        "https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/adobe.png"
    },
    {
      public_id: "logos/apple",
      format: "png",
      version: 1585753401,
      resource_type: "image",
      type: "upload",
      created_at: "2020-04-01T15:03:21Z",
      bytes: 6583,
      width: 250,
      height: 275,
      access_mode: "public",
      url:
        "http://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/apple.png",
      secure_url:
        "https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/apple.png"
    },
    {
      public_id: "logos/appsumo",
      format: "png",
      version: 1585753401,
      resource_type: "image",
      type: "upload",
      created_at: "2020-04-01T15:03:21Z",
      bytes: 10280,
      width: 250,
      height: 53,
      access_mode: "public",
      url:
        "http://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/appsumo.png",
      secure_url:
        "https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/appsumo.png"
    }
  ]
};

// console.log(results["resources"]);
/* [{...},{...},{...}] */
/*
      results["resources"][0].secure_url
 "https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/adobe.png "

 */
// let resourceArr = Object.entries(results.resources);
let newResult = Object.entries(results["resources"][0]);
let extractedUrl = results["resources"][0].secure_url;
let extractedLogoName = extractedUrl
  .match(/(?<=logos\/)(.*)(?=.png)/gi)
  .toString();

let items = [];
let item = new Object();

item[extractedLogoName] = extractedUrl;

items.push(item);
// console.log(results.resources[0]);
// console.log(resourceArr);
console.log(newResult[11][1]);
console.log(items);

console.log(extractedUrl);
console.log(extractedLogoName);

/**************
const resourceArr = Object.entries(results.resources);
let entries = [];
let subscriptionObj = new Object();
let subscriptionArr = [];
resourceArr.map(([key, value]) => {
  let secureUrl = value.secure_url;
  let logoName = secureUrl.match(/(?<=logos\/)(.*)(?=.png)/gi);

  subscriptionObj[logoName] = secureUrl;
  let entries = Object.entries(subscriptionObj);
  console.log;
});
console.log(entries);
**************/

// console.log(subscriptionArr); //

/*
{
  adobe: 'https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/adobe.png', 

  apple: 'https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/apple.png', 

  appsumo: 'https://res.cloudinary.com/dg1xmeryg/image/upload/v1585753401/logos/appsumo.png'

} 


  */
