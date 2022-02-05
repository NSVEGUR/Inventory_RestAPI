import { prop, getModelForClass, mongoose, modelOptions, Severity, Prop } from '@typegoose/typegoose';

export interface lendHistory {
	rollNumber: string;
	dateOfReceiving: Date;
	dateOfReturning: Date | undefined;
}


@modelOptions({
	options: {
		allowMixed: Severity.ALLOW,
	},
})
export class Product {
	[x: string]: any;

	@prop({ required: true })
	productName: string;

	@prop({ required: true })
	isAvailable: boolean;

	@prop({ required: true, type: mongoose.Schema.Types.Mixed })
	lendHistory: lendHistory[];

	@Prop({ required: true })
	productDetails: string;

}

export const ProductModel = getModelForClass(Product, {});