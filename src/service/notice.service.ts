import { NoticeModel } from '../model/notice.model';
import { noticeSchemaType } from '../schema/notice.schema';

async function create(data: noticeSchemaType) {

	const details = {
		title: data.title,
		description: data.description,
	}
	return await NoticeModel.create(details);
};

async function get(id: string) {
	return await NoticeModel.findById(id);
}

async function getAll() {
	return await NoticeModel.find();
}

async function update(id: string, data: any) {
	const updatedProduct = await NoticeModel.findByIdAndUpdate(id, data, {
		new: true,
	});
	return updatedProduct;
}

async function deleteNotice(id: string) {
	return await NoticeModel.findByIdAndDelete(id);
}



export default {
	create,
	get,
	getAll,
	update,
	deleteNotice,
}

