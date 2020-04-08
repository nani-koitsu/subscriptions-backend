const axios = require("axios");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// re-use for sub logos not found

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const AxiosRiteKit = axios.create({
  baseURL: "https://api.ritekit.com/v1/images/",
  headers: { "Content-Type": "application/json" },
  responseType: "arraybuffer"
});

AxiosRiteKit.get("logo?domain=google.com", {
  params: {
    client_id: process.env.RITE_KIT_CLIENT_ID
  }
})
  .then(response => {
    let newResponse = Buffer.from(response.data, "binary").toString("base64");
    console.log(newResponse);
    cloudinary.uploader.upload(
      `data:image/png;base64,${newResponse}`,
      (error, result) => console.log(error, result)
    );
  })
  .catch(error => {
    console.log(error);
  });
