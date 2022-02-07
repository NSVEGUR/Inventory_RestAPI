import { Request, Response, NextFunction } from 'express';
import { guidelinesSchemaType } from '../schema/notice.schema';
import Guidelines from '../service/guidelines.service';
import AppError from '../util/appError.util';
import catchAsync from '../util/catchAsync.util';

const create = catchAsync(async function (
	req: Request<{}, {}, guidelinesSchemaType>,
	res: Response,
	next: NextFunction
) {
	const newGuidelines = await Guidelines.create(req.body);
	res.status(201).json({
		status: 'success',
		message: 'Guidelines created successfully',
		data: {
			guidelines: newGuidelines
		}
	})
});



const get = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const guidelines = await Guidelines.get(id);
	if (!guidelines) return next(new AppError('No Guideliness exist on this id', 404));
	res.status(200).json({
		status: 'success',
		message: 'Guidelines fetched successfully',
		data: {
			guidelines
		}
	});
})

const getAll = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const guidelines = await Guidelines.getAll();
	if (guidelines.length === 0) return next(new AppError('There are no guideliness to show, Please add', 404));
	res.status(200).json({
		status: 'success',
		message: 'Guidelines fetched successfully',
		data: {
			quantity: guidelines.length,
			guidelines
		}
	});
});

const update = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const data = req.body;
	const updatedGuidelines = await Guidelines.update(id, data);
	res.status(200).json({
		status: 'success',
		message: 'Guidelines updated successfully',
		data: {
			updatedGuidelines
		}
	})
});

const deleteGuidelines = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const guidelines = await Guidelines.deleteGuidelines(id);
	if (!guidelines) return res.status(404).json({
		status: 'fail',
		message: 'Guidelines not found',
	});
	res.status(200).json({
		status: 'success',
		message: 'Guidelines deleted successfully',
	})
});


export default {
	create,
	get,
	getAll,
	update,
	deleteGuidelines,
}