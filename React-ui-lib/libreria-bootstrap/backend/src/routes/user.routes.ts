import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { createUserSchema, updateUserSchema } from '../validations/user.validation';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', authenticate, authorize('admin'), userController.getAllUsers);
router.get('/:id', authenticate, authorize('admin'), userController.getUserById);
router.post('/', authenticate, authorize('admin'), validate(createUserSchema), userController.createUser);
router.put('/:id', authenticate, authorize('admin'), validate(updateUserSchema), userController.updateUser);
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

export const userRoutes = router;