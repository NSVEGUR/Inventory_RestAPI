import { Request, Response, NextFunction } from 'express';
import Student from '../service/student.service';
import AppError from '../util/appError.util';
import catchAsync from '../util/catchAsync.util';
import getStudentProducts from '../util/getStudentProducts.util';



const getProducts = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {

	const products: any = await Student.getProducts();
	if (products.length === 0) return next(new AppError('There are no products to show', 404));
	products.forEach((product: any) => {
		product.lendHistory = undefined;
	});
	res.status(200).json({
		status: 'success',
		message: 'Products fetched successfully',
		data: {
			products
		}
	})
});

const getMyProducts = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const products: any = await Student.getProducts();
	if (products.length === 0) return next(new AppError('There are no products to show', 404));
	const myProducts = getStudentProducts(req.currentStudent.rollNumber, products);
	myProducts.forEach((product: any) => {
		product.lendHistory = undefined;
	});
	res.status(200).json({
		status: 'success',
		message: 'Products fetched successfully',
		data: {
			products: myProducts
		}
	})
});

const getNotice = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {

	const notice: any = await Student.getNotice();
	if (notice.length === 0) return next(new AppError('There are no notice to show', 404));
	notice.forEach((product: any) => {
		product.lendHistory = undefined;
	});
	res.status(200).json({
		status: 'success',
		message: 'Notice fetched successfully',
		data: {
			notice
		}
	})
});
const getGuidelines = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {

	const guidelines: any = await Student.getGuidelines();
	if (guidelines.length === 0) return next(new AppError('There are no guidelines to show', 404));
	guidelines.forEach((product: any) => {
		product.lendHistory = undefined;
	});
	res.status(200).json({
		status: 'success',
		message: 'Products fetched successfully',
		data: {
			guidelines
		}
	})
});


export {
	getProducts,
	getMyProducts,
	getNotice,
	getGuidelines,
}