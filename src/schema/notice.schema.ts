import { object, string, array, TypeOf, union } from 'zod';

export const noticeSchema = object({
	body: object({
		title: string({
			required_error: 'Notice must contain title'
		}),
		description: string({
			required_error: 'Notice must contain description'
		})
	})
});

export type noticeSchemaType = TypeOf<typeof noticeSchema>['body'];



export const guidelinesSchema = object({
	body: object({
		title: string({
			required_error: 'Guidelines must contain title'
		}),
		description: union([string(), array(string())], {
			required_error: 'Description must be provided'
		})
	})
});

export type guidelinesSchemaType = TypeOf<typeof guidelinesSchema>['body'];