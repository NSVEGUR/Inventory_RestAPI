import express from 'express';
import { login, signup, protect } from '../controller/auth.controller';
import { getProducts, getMyProducts } from '../controller/student.controller';
import validateResource from '../middleware/resource.validator';
import { loginSchema } from '../schema/login.schema';
import { signupSchema } from '../schema/signup.schema';



const router = express.Router();
router.post('/signup', validateResource(signupSchema), signup);
router.post('/login', validateResource(loginSchema), login);
router.get('/products', protect, getProducts);
router.get('/myProducts', protect, getMyProducts);

export default router;