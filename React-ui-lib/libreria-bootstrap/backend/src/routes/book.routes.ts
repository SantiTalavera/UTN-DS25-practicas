import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, authorize('admin', 'user'),bookController.getAllBooksController);
router.get('/:id',authenticate, authorize('admin', 'user') , bookController.getBookByIdController);
router.post('/', authenticate, authorize('admin', 'user'), validate(createBookSchema), bookController.createBookController);
router.put('/:id', authenticate, authorize('admin', 'user'), validate(updateBookSchema), bookController.updateBookController);
router.delete('/:id', authenticate, authorize('admin'), bookController.deleteBookController);

export const booksRoutes = router;
