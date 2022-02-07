import express from 'express';
import Notice from './../controller/notice.controller';
import Guidelines from './../controller/guidelines.controller';



const router = express.Router();
router.route('/notice').post(Notice.create).get(Notice.getAll);
router.route('/notice/:id').get(Notice.get).patch(Notice.update).delete(Notice.deleteNotice);

router.route('/guidelines').post(Guidelines.create).get(Guidelines.getAll);
router.route('/guidelines/:id').get(Guidelines.get).patch(Guidelines.update).delete(Guidelines.deleteGuidelines);

export default router;