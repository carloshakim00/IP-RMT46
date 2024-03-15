const { Product } = require("../models");
const { toRupiah, formatDate } = require("../helpers/format");
class PublicController {
  static async getAllProduct(req, res, next) {
    try {
      let { search } = req.query;
      let whereCondition = {};
      if (search) {
        whereCondition.name = {
          [Op.like]: `%${search}%`,
        };
      }

      const data = await Product.findAll({
        where: whereCondition,
      });

      const productsWithFormat = data.map((product) => ({
        ...product.dataValues,
        price: toRupiah(product.price),
        updatedAt: formatDate(product.updatedAt),
      }));

      res.json(productsWithFormat);
    } catch (error) {
      next(error);
    }
  }

  static async getAllProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        throw {
          name: "NotFound",
        };
      }
      const productsWithFormat = product.map((product) => ({
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

module.exports = PublicController;
