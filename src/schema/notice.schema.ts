import { object, string, array, TypeOf, union } from 'zod';

export const noticeSchema = object({
	body: object({
		noticeTitle: string({
			required_error: 'Notice must contain title'
		}),
		noticeDescription: string({
			required_error: 'Notice must contain description'
		})
	})
});

export type noticeSchemaType = TypeOf<typeof noticeSchema>['body'];



export const guidelinesSchema = object({
	body: object({
		guidelinesTitle: string({
			required_error: 'Guidelines must contain title'
		}),
		guidelines: union([string(), array(string())], {
			required_error: 'Guidelines must be provided'
		})
	})
});

export type guidelinesSchemaType = TypeOf<typeof guidelinesSchema>['body'];