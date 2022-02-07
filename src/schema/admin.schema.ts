import { object, string, TypeOf } from "zod";
import config from "../config";

export const adminSchema = object({
	body: object({
		adminName: string({
			required_error: 'Please provide the admin name'
		}),
		adminPassword: string({
			required_error: 'Please provide the admin password'
		})
	}).refine((data) => data.adminName === config.ADMIN_NAME && data.adminPassword === config.ADMIN_PASSWORD, {
		message: 'Invalid admin name or Password'
	})
});

export type adminSchemaType = TypeOf<typeof adminSchema>['body'];