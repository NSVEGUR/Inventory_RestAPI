import { getModelForClass, modelOptions, mongoose, prop, Severity } from "@typegoose/typegoose";


@modelOptions({
	options: {
		allowMixed: Severity.ALLOW,
	},
})
export class Guidelines {
	[x: string]: any;

	@prop({ required: true })
	guidelinesTitle: string;

	@prop({ required: true, type: mongoose.Schema.Types.Mixed })
	guidelines: string[] | string;
}

export const GuidelinesModel = getModelForClass(Guidelines);