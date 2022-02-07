import { GuidelinesModel } from '../model/guidelines.model';
import { guidelinesSchemaType } from '../schema/notice.schema';

async function create(data: guidelinesSchemaType) {

	const details = {
		guidelinesTitle: data.guidelinesTitle,
		guidelines: data.guidelines
	}
	return await GuidelinesModel.create(details);
};

async function get(id: string) {
	return await GuidelinesModel.findById(id);
}

async function getAll() {
	return await GuidelinesModel.find();
}

async function update(id: string, data: any) {
	const updatedProduct = await GuidelinesModel.findByIdAndUpdate(id, data, {
		new: true,
	});
	return updatedProduct;
}

async function deleteGuidelines(id: string) {
	return await GuidelinesModel.findByIdAndDelete(id);
}



export default {
	create,
	get,
	getAll,
	update,
	deleteGuidelines,
}

