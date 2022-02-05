import express from 'express';
import { validateAuthResource } from '../middleware/resource.validator';
import { productCreateSchema } from '../schema/product.schema';
import { headProtectSchema } from '../schema/protect.schema';
import { create, getAll, get, update, deleteProduct } from '../controller/product.controller';



const router = express.Router();

router.route('/').post(validateAuthResource(productCreateSchema), create);
router.use(validateAuthResource(headProtectSchema));
router.route('/').get(getAll);
router.route('/:id').get(get).patch(update).delete(deleteProduct);


export default router;