import { NextFunction } from 'express';
import { signupType } from '../schema/signup.schema';
import { loginType } from '../schema/login.schema';
import { StudentModel } from '../model/student.model';
import AppError from '../util/appError.util';
import Product from './product.service';

async function create(data: signupType) {
	const details = {
		rollNumber: data.rollNumber,
		collegeMail: data.collegeMail,
		password: data.password
	}
	return await StudentModel.create(details);
};


async function get(data: loginType, next: NextFunction) {
	const { collegeMail, password } = data;
	const student = await StudentModel.findOne({ collegeMail }).select('+password');
	if (!student || !await student.correctPassword(password, student.password)) {
		return next((new AppError('Invalid email or password', 404)));
	}
	return student;
};

async function getProducts(next: NextFunction) {
	const products = await Product.getAll();
	return products;
}


export default {
	create,
	get,
	getProducts,
}