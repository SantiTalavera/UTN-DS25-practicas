import { Router } from 'express';
import * as controller from '../controllers/book.controller';

const router = Router();

router.get('/', controller.getAllBooksController);
router.get('/:titulo', controller.getBookByTitleController);
router.post('/', controller.createBookController);
router.put('/:titulo', controller.updateBookController);
router.delete('/:titulo', controller.deleteBookController);

export const booksRoutes = router;
