const axios = require("axios");
require('../cloudinaryConfig')
const { RITE_KIT_CLIENT_ID } = require('../../config')

const AxiosRiteKit = axios.create({
  baseURL: "https://api.ritekit.com/v1/images/",
  headers: { "Content-Type": "application/json" },
  responseType: "arraybuffer"
});

AxiosRiteKit.get("logo?domain=google.com", {
  params: {
    client_id: RITE_KIT_CLIENT_ID
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
