import { object, string, TypeOf } from "zod";
import config from "../config";

export const headProtectSchema = object({
	body: object({
		headName: string({
			required_error: 'Authorization error, you have no access'
		}),
		headPassword: string({
			required_error: 'Authorization error, you have no access'
		})
	}).refine((data) => data.headName === config.HEAD_NAME && data.headPassword === config.HEAD_PASSWORD, {
		message: 'Invalid Head or Password'
	})
});

export type headProtectType = TypeOf<typeof headProtectSchema>['body'];