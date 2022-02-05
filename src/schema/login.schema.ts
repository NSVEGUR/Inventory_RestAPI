import { object, string, TypeOf } from 'zod';

export const loginSchema = object({
	body: object({
		collegeMail: string({
			required_error: 'Please provide your college mail id to create your account'
		}),
		password: string({
			required_error: 'Please provide a password to protect your account'
		}).min(8, 'Password is too weak, atleast contain 8 characters')
	})
})

export type loginType = TypeOf<typeof loginSchema>['body'];