const { Proof } = require("../models");

const cloud_name = process.env.cloud_name;
const api_key = process.env.api_key;
const api_secret = process.env.api_secret;

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

class ProofController {
  static async createProof(req, res, next) {
    try {
      const file = req.body.image; 
      const timestamp = new Date().getTime();
      const publicId = `image_${timestamp}`;
      
      const result = await cloudinary.uploader.upload(file, {
        public_id: publicId,
      });


      await Proof.create({
        imageUrl: result.secure_url,
        userId: req.body.userId
      });

      res.status(201).json({ message: "Proof has been created" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProofController;
