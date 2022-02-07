import express from 'express';
import { login, signup, protect } from '../controller/auth.controller';
import { getProducts, getMyProducts, getNotice, getGuidelines } from '../controller/student.controller';
import validateResource from '../middleware/resource.validator';
import { loginSchema } from '../schema/login.schema';
import { signupSchema } from '../schema/signup.schema';



const router = express.Router();
router.post('/signup', validateResource(signupSchema), signup);
router.post('/login', validateResource(loginSchema), login);
router.use(protect);
router.get('/products', getProducts);
router.get('/myProducts', getMyProducts);
router.get('/notice', getNotice);
router.get('/guidelines', getGuidelines);


export default router;