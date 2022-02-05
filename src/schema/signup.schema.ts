import { object, string, TypeOf } from 'zod';

export const signupSchema = object({
	body: object({
		rollNumber: string({
			required_error: 'Please provide your roll number to create your account'
		}),
		collegeMail: string({
			required_error: 'Please provide your college mail id to create your account'
		}),
		password: string({
			required_error: 'Please provide a password to protect your account'
		}).min(8, 'Password is too weak, atleast contain 8 characters')
	})
})

export type signupType = TypeOf<typeof signupSchema>['body'];