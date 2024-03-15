c:onst { Proof } = require("../models");

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
      console.log(req.file);
      console.log(req.body);
      const mimetype = req.file.mimetype;
      const data = Buffe      const dataURL = `data:${mimetype};base64,${data}`;
      const timestamp = new Date().getTime();
      const publicId = `image_${timestamp}`;
      const file = await cloudinary.uploader.upload(dataURL, {
        public_id: publicId,
      });
      await Proof.create({
          imageUrl: file.secure_url,
          userId: req.body.userId
      })
      res.status(201).json({message: "Proof has been created"});
    } catch (error) {
      next(error);
 }
  }}
odule.exports = ProofCon:q
troller;
