import { Router } from "express";
import { BookController } from "./Book.controller";

const router = Router();

router.post("/create-new-book", BookController.CreateBook);
router.get("/get-all-books", BookController.RetriveBooks);

export const BookRoutes = router;