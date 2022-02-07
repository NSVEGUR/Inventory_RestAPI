import express from 'express';
import { create, getAll, get, update, deleteProduct } from '../controller/product.controller';



const router = express.Router();
router.route('/products').post(create).get(getAll);
router.route('/products/:id').get(get).patch(update).delete(deleteProduct);


export default router;