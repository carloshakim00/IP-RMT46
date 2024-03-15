const { Product} = require("../models");
const {toRupiah, formatDate} = require("../helpers/format");
class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const products = await Product.findAll();
      const productsWithFormat = products.map(product => ({
        ...product.dataValues,
        price: toRupiah(product.price),
        updatedAt: formatDate(product.updatedAt),
      }));
      res.json(productsWithFormat);
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
      const productsWithFormat = product.map(product => ({
        ...product.dataValues,
        price: toRupiah(product.price),
        updatedAt: formatDate(product.updatedAt),
      }));
      res.json(productsWithFormat);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = ProductController;
