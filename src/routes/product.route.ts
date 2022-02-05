import express from 'express';
import { validateAuthResource } from '../middleware/resource.validator';
import { productCreateSchema, productProtectSchema } from '../schema/product.schema';
import { create, getAll, get, update, deleteProduct } from '../controller/product.controller';



const router = express.Router();


router.route('/').post(validateAuthResource(productCreateSchema), create).get(validateAuthResource(productProtectSchema), getAll);
router.route('/:id').get(validateAuthResource(productProtectSchema), get).patch(validateAuthResource(productProtectSchema), update).delete(validateAuthResource(productProtectSchema), deleteProduct);


export default router;