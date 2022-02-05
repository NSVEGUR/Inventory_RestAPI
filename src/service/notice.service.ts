import { NoticeModel } from '../model/notice.model';
import { noticeCreateType } from '../schema/notice.schema';

async function create(data: noticeCreateType) {

	const details = {
		noticeTitle: data.noticeTitle,
		noticeDescription: data.noticeDescription
	}
	return await NoticeModel.create(details);
};

async function get(id: string) {
	return await NoticeModel.findById(id);
}

async function getAll() {
	return NoticeModel.find();
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

