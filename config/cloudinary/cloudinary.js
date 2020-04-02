const Axios = require("axios");
const cloudinary = require("cloudinary");
require("dotenv").config();
// CLOUDINARY CREDENTIALS
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.v2.api.resources(
  { type: "upload", max_results: 500, prefix: "logos" },
  (error, result) => {
    result = Object.entries(result.resources);
    // console.log(result);

    let cloudArr = [];
    let cloudObj = {};
    result.forEach(([key, value]) => {
      let secureUrl = value.secure_url;
      let name = secureUrl.match(/(?<=logos\/)(.*)(?=.png)/gi).toString();
      cloudObj[name] = secureUrl;
    });

    console.log(cloudObj);
  }
);
