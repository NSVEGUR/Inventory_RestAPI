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

export const noticeCreateSchema = object({
	body: object({
		headName: string({
			required_error: 'Authorization error, you have no access'
		}),
		headPassword: string({
			required_error: 'Authorization error, you have no access'
		}),
		noticeTitle: string({
			required_error: 'Notice must contain title'
		}),
		noticeDescription: string({
			required_error: 'Notice must contain description'
		})
	})
});

export type noticeCreateType = TypeOf<typeof noticeCreateSchema>['body'];

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

export const guidelinesCreateSchema = object({
	body: object({
		headName: string({
			required_error: 'Authorization error, you have no access'
		}),
		headPassword: string({
			required_error: 'Authorization error, you have no access'
		}),
		guidelinesTitle: string({
			required_error: 'Guidelines must contain title'
		}),
		guidelines: union([string(), array(string())], {
			required_error: 'Guidelines must be provided'
		})
	})
});

export type guidelinesCreateType = TypeOf<typeof guidelinesCreateSchema>['body'];