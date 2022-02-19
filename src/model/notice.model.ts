import { prop, getModelForClass } from '@typegoose/typegoose';



export class Notice {
	[x: string]: any;

	@prop({ required: true })
	title: string;

	@prop({ required: true })
	description: string;
}


export const NoticeModel = getModelForClass(Notice);