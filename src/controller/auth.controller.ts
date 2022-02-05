import { Request, Response, NextFunction } from 'express';
const { promisify } = require('util');
import jwt from 'jsonwebtoken';
import config from './../config';
import { signupType } from './../schema/signup.schema';
import { loginType } from '../schema/login.schema';
import Student from '../service/student.service';
import { StudentModel } from '../model/student.model';
import catchAsync from '../util/catchAsync.util';
import AppError from '../util/appError.util';

const signup = catchAsync(async function (
	req: Request<{}, {}, signupType>,
	res: Response,
	next: NextFunction
) {
	const newStudent: any = await Student.create(req.body);
	newStudent.password = undefined;
	const token = await newStudent.signToken();
	res.status(201).json({
		status: 'success',
		message: 'account created successfully',
		data: {
			token,
			user: newStudent,
		}
	})
});

const login = catchAsync(async function (
	req: Request<{}, {}, loginType>,
	res: Response,
	next: NextFunction
) {
	const student: any = await Student.get(req.body, next);
	student.password = undefined;
	const token = await student.signToken();
	res.status(201).json({
		status: 'success',
		message: 'logged in successfully',
		data: {
			token,
			user: student,
		}
	})
});

const protect = catchAsync(async function (req: Request, res: Response, next: NextFunction) {
	//1) Getting token and check if it's there
	let token = '';
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}
	if (!token)
		return next(new AppError(`You're not logged in! Please Login to get Access`, 401));

	//2) Verification token
	const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

	//3) Check if student exist
	const student = await StudentModel.findById(decoded._id);

	if (!student)
		return next(new AppError(`The student belonging to the token no longer exist`, 404));

	//4) Check if user changed the password after the token is issued
	if (student.changedPasswordAfter(decoded.iat)) {
		return next(new AppError(`The user recently changed the password, Please Login Again!`, 401));
	}

	req.currentStudent = student;
	next();
});

export {
	signup,
	login,
	protect
}