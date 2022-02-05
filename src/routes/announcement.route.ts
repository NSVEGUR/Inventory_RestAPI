import express from 'express';
import { validateAuthResource } from '../middleware/resource.validator';
import { noticeCreateSchema, guidelinesCreateSchema } from '../schema/notice.schema';
import { headProtectSchema } from '../schema/protect.schema';
import Notice from './../controller/notice.controller';
import Guidelines from './../controller/guidelines.controller';



const router = express.Router();
router.route('/notice').post(validateAuthResource(noticeCreateSchema), Notice.create);
router.route('/guidelines').post(validateAuthResource(guidelinesCreateSchema), Guidelines.create);
router.use(validateAuthResource(headProtectSchema));


router.route('/notice').get(Notice.getAll);
router.route('/notice/:id').get(Notice.get).patch(Notice.update).delete(Notice.deleteNotice);

router.route('/guidelines').get(Guidelines.getAll);
router.route('/guidelines/:id').get(Guidelines.get).patch(Guidelines.update).delete(Guidelines.deleteGuidelines);


export default router;