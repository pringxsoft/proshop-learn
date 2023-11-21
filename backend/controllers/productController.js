import asyncHandler from '../middleware/asyncHandler.js';

import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	// pass in an empty object to get all products
	const products = await Product.find({});
	res.json(products);
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id); // mongoose method
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Resource not found');
	}
});

// @desc    Create new product
// @route   POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		rating: 0,
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	const createdProduct = await product.save();

	res.status(200).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { _id, name, price, description, image, brand, category, countInStock } = req.body;

	const product = await Product.findById(_id);

	if (product) {
		product.name = name;
		product.price = price;
		product.brand = brand;
		product.description = description;
		product.category = category;
		product.image = image;
		product.countInStock = countInStock;

		const updateProduct = await product.save();

		res.json(updateProduct);
	} else {
		res.status(404);
		throw new Error('Resource not found');
	}
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.status(200).json({ message: 'Product deleted' });
	} else {
		res.status(404);
		throw new Error('Resource not found');
	}
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
