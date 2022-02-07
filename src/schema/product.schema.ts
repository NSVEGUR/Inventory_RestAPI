import { object, string, boolean, TypeOf } from 'zod';
import config from './../config';

export const productSchema = object({
	body: object({
		productName: string({
			required_error: 'Please provide the	name of the product'
		}),
		isAvailable: string({
			required_error: 'Please provide the availability of the product'
		})
	})
});

export type productSchemaType = TypeOf<typeof productSchema>['body'];

