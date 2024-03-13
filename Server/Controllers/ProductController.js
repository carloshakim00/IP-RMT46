const { Product, User } = require("../models");

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        throw {
          name: "NotFound",
        };
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const product = await Product.create({...req.body});
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        throw {
          name: "NotFound",
        };
      }
      await product.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ message: `Product ${product.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
