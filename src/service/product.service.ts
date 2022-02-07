import { lendHistory, ProductModel } from '../model/product.model';
import { productSchemaType } from '../schema/product.schema';

async function create(data: productSchemaType) {

	const details = {
		productName: data.productName,
		isAvailable: data.isAvailable,
		productDetails: 'A Sample Product'
	}
	return await ProductModel.create(details);
};

async function get(id: string) {
	return await ProductModel.findById(id);
}

async function getAll() {
	return ProductModel.find();
}

async function update(id: string, data: any) {
	const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
		new: true,
	});
	return updatedProduct;
}

async function deleteProduct(id: string) {
	return await ProductModel.findByIdAndDelete(id);
}



export default {
	create,
	get,
	getAll,
	update,
	deleteProduct,
}

