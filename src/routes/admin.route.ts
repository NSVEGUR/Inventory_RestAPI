import express from 'express';
import validateResource from '../middleware/resource.validator';
import { adminSchema } from '../schema/admin.schema';
import { adminLogin, adminProtect } from '../controller/auth.controller';
import productRoute from './product.route';
import announcementRoute from './announcement.route';



const router = express.Router();

router.post('/login', validateResource(adminSchema), adminLogin);
router.use(adminProtect, productRoute, announcementRoute);

export default router;