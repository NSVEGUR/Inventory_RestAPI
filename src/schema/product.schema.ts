import { object, string, boolean, TypeOf } from 'zod';
import config from './../config';

export const productCreateSchema = object({
	body: object({
		headName: string({
			required_error: 'Authorization error, you have no access'
		}),
		headPassword: string({
			required_error: 'Authorization error, you have no access'
		}),
		productName: string({
			required_error: 'Please provide the	name of the product'
		}),
		isAvailable: boolean({
			required_error: 'Please provide the availability of the product'
		})
	}).refine((data) => data.headName === config.HEAD_NAME && data.headPassword === config.HEAD_PASSWORD, {
		message: 'Invalid Author or Password'
	})
});

export type productCreateType = TypeOf<typeof productCreateSchema>['body'];

