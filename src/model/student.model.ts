import { prop, pre, getModelForClass } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import config from '../config';
import jwt from 'jsonwebtoken';


@pre<Student>('save', async function (next) {
	if (!this.isModified('password')) {
		return;
	}

	this.password = await bcrypt.hash(this.password, 12);

	next();
})

export class Student {
	[x: string]: any;

	//Properties
	@prop({ required: true, unique: true, trim: true })
	rollNumber: string;

	@prop({ required: true, unique: true, trim: true })
	collegeMail: string;

	@prop({ required: true, select: false })
	password: string;

	studentName: string;
	photo: string;
	passwordChangedAt: any;

	//Methods
	//To compare the encrypted password
	async correctPassword(candidatePassword: string, studentPassword: string) {
		return await bcrypt.compare(candidatePassword, studentPassword);
	}
	//To provide a jwt token
	signToken(this: Student) {
		return jwt.sign({
			_id: this._id,
		}, config.JWT_SECRET, {
			expiresIn: config.JWT_EXPIRES_IN
		});
	}
	//to check if the password is changed after issuing jwt token
	changedPasswordAfter(this: Student, JWTTimeStamp: number) {
		if (this.passwordChangedAt) {
			const changedTimeStamp = parseInt(
				`${this.passwordChangedAt.getTimeStamp() / 1000}`,
				10
			);
			return JWTTimeStamp < changedTimeStamp; //If user Changed the password after issueing the JWT Token
		}
		return false;
	}
}

export const StudentModel = getModelForClass(Student);