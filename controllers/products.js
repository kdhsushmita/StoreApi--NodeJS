const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const product = await Product.find({}).select('name price').limit(4).skip(5);
    res.status(200).json({ product, nbHits: product.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === "true" ? true : false
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: name, $option: i }
    }
    let results = await Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        results = results.sort(sortList)
    }
    else {
        results = results.sort('createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        results = results.select(fieldsList);
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await results
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts, getAllProductsStatic
}