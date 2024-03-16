const {Product} = require("../models")
const {Op} = require("sequelize")
class PublicController{
    static async getAllProduct(req, res, next) {
        try {
            let {search,page} = req.query
            let whereCondition = {}
            if (search) {
                whereCondition.name = {
                    [Op.iLike]: `%${search}%`
                }
            }
            const limit = 10;
            const offset = (page - 1) * limit || 0;
            const number = 1
            const {rows,count} = await Product.findAndCountAll({
                where: whereCondition,
                limit: limit,
                offset: offset
            })
           
            let data = {
                total: count,
                size: limit,
                totalPage: Math.ceil(count / limit),
                currentPage: number,
                data: rows
            }

           res.status(200).json(data)
        }catch (error) {
            next(error)
        }
    }

    static async getAllProductById(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findByPk(id)
            if(!product){
                throw {
                    name: "NotFound",
                }
            }else{
                res.status(200).json(product)
            }
        }catch (error) {
            next(error)
        }
    }

}

module.exports = PublicController