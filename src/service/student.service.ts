import { signupType } from '../schema/signup.schema';
import { loginType } from '../schema/login.schema';
import { StudentModel } from '../model/student.model';
import AppError from '../util/appError.util';
import Product from './product.service';
import Notice from './notice.service';
import Guidelines from './guidelines.service';

async function create(data: signupType) {
	const details = {
		rollNumber: data.rollNumber,
		collegeMail: data.collegeMail,
		password: data.password
	}
	return await StudentModel.create(details);
};


async function get(data: loginType) {
	const { collegeMail, password } = data;
	const student = await StudentModel.findOne({ collegeMail }).select('+password');
	return student;
};

async function getProducts() {
	const products = await Product.getAll();
	return products;
}

async function getNotice() {
	const notice = await Notice.getAll();
	return notice;
}

async function getGuidelines() {
	const guidelines = await Guidelines.getAll();
	return guidelines;
}

export default {
	create,
	get,
	getProducts,
	getNotice,
	getGuidelines,
}