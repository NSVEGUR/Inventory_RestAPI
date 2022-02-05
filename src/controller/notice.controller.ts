import { Request, Response, NextFunction } from 'express';
import { noticeCreateType } from '../schema/notice.schema';
import Notice from '../service/notice.service';
import AppError from '../util/appError.util';
import catchAsync from '../util/catchAsync.util';

const create = catchAsync(async function (
	req: Request<{}, {}, noticeCreateType>,
	res: Response,
	next: NextFunction
) {
	const newNotice = await Notice.create(req.body);
	res.status(201).json({
		status: 'success',
		message: 'Notice created successfully',
		data: {
			notice: newNotice
		}
	})
});



const get = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const notice = await Notice.get(id);
	if (!notice) return next(new AppError('No Notices exist on this id', 404));
	res.status(200).json({
		status: 'success',
		message: 'Notice fetched successfully',
		data: {
			notice
		}
	});
})

const getAll = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const notices = await Notice.getAll();
	if (notices.length === 0) return next(new AppError('There are no notices to show, Please add', 404));
	res.status(200).json({
		status: 'success',
		message: 'Notices fetched successfully',
		data: {
			notices
		}
	});
});

const update = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const data = req.body;
	const updatedNotice = await Notice.update(id, data);
	res.status(200).json({
		status: 'success',
		message: 'Notice updated successfully',
		data: {
			updatedNotice
		}
	})
});

const deleteNotice = catchAsync(async function (
	req: Request, res: Response, next: NextFunction
) {
	const id = req.params.id;
	const notice = await Notice.deleteNotice(id);
	if (!notice) return res.status(404).json({
		status: 'fail',
		message: 'Notice not found',
	});
	res.status(200).json({
		status: 'success',
		message: 'Notice deleted successfully',
	})
});


export default {
	create,
	get,
	getAll,
	update,
	deleteNotice,
}