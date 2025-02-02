import { Router } from 'express';
import { BookController } from './Book.controller';

const router = Router();

router.post('/create-new-book', BookController.CreateBook);
router.get('/get-all-books', BookController.RetriveBooks);
router.get('/get-book/:id', BookController.RetriveSingleBook);
// router.get('/category/:category', BookController.RetriveBooksByCategory);
router.get('/category', BookController.NumberOfCategory);
router.patch("/delete-book/:id", BookController.DeleteBook)
router.put("/update-book/:id", BookController.UpdateBook)
export const BookRoutes = router;
