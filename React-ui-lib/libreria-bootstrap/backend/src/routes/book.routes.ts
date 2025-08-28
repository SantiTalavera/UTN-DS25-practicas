import { Router } from 'express';
import * as controller from '../controllers/book.controller';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.get('/', controller.getAllBooksController);
router.get('/:id', controller.getBookByIdController);
router.post('/', validate(createBookSchema),controller.createBookController);
router.put('/:id',validate(updateBookSchema), controller.updateBookController);
router.delete('/:id', controller.deleteBookController);

export const booksRoutes = router;
