import { prop, getModelForClass } from '@typegoose/typegoose';



export class Notice {
	[x: string]: any;

	@prop({ required: true })
	noticeTitle: string;

	@prop({ required: true })
	noticeDescription: string;
}


export const NoticeModel = getModelForClass(Notice);