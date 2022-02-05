import { Request, Response, NextFunction } from 'express';
import { productCreateType } from '../schema/product.schema';
import Product from '../service/product.service';
import AppError from '../util/appError.util';
import catchAsync from '../util/catchAsync.util';

const create = catchAsync(async function (
	req: Request<{}, {}, productCreateType>,
	res: Response,
	next: NextFunction
) {
	const newProduct = await Product.create(req.body);
	res.status(201).json({
		status: 'success',
		message: 'Product created successfully',
		data: {
			product: newProduct
		}
	})
});

const get = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const product = await Product.get(id);
	if (!product) return next(new AppError('No Products exist on this id', 404));
	res.status(200).json({
		status: 'success',
		message: 'Product fetched successfully',
		data: {
			product
		}
	});
})

const getAll = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const products = await Product.getAll();
	if (products.length === 0) return next(new AppError('There are no products to show, Please add', 404));
	res.status(200).json({
		status: 'success',
		message: 'Products fetched successfully',
		data: {
			products
		}
	});
});

const update = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const data = req.body;
	const updatedProduct = await Product.update(id, data);
	res.status(200).json({
		status: 'success',
		message: 'Product updated successfully',
		data: {
			updatedProduct
		}
	})
});

const deleteProduct = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const product = await Product.deleteProduct(id);
	if (!product) return res.status(404).json({
		status: 'fail',
		message: 'Product not found',
	});
	res.status(200).json({
		status: 'success',
		message: 'Product deleted successfully',
	})
});


export {
	create,
	get,
	getAll,
	update,
	deleteProduct,
}