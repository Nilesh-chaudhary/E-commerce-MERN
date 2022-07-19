const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create product -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// Get all products 
exports.getAllProducts = catchAsyncErrors( async (req, res) => {

    const  resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    let products = await apiFeatures.query;

    // products = await apiFeatures.query
    res.status(200).json({
        success: true,
        products
    });

})

// update product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    res.status(200).json({
        success: true,
        product
    })

})

// Get single product details

exports.getProductDetails = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })

})

// delete product -- admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: " product deleted successfully"
    })

})