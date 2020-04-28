const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME
} = require('../config')
const cloudinary = require("cloudinary");


cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


module.exports = {
  fetchAllImages: async (req, res) => {
    let cloudObj = {};
    try {
      await cloudinary.v2.api
        .resources(
          { type: "upload", max_results: 500, prefix: "logos" },
          (error, result) => {
            result = Object.entries(result.resources);

            result.forEach(([key, value]) => {
              let secureUrl = value.secure_url;

              let name = secureUrl
                .match(/(?<=logos\/)(.*)(?=.png)/gi)
                .toString();

              cloudObj[name] = secureUrl;
            });
          }
        )
        .then(() => console.log(`success backend`));
      // console.log("new object", cloudObj);
      res.status(200).send(cloudObj);
    } catch (error) {
      console.log(error);

      res.status(500).send("Image server not responding");
    }
  },
};
