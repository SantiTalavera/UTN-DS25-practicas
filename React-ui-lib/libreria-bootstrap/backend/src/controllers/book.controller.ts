import { Request, Response, NextFunction } from "express";
import * as bookService from "../services/book.service";

export async function getAllBooksController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await bookService.getAllBooks();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}


export async function getBookByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const book = await bookService.getBookById(id);
    res.json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
}


export async function createBookController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await bookService.createBook(req.body);
    res.status(201).json({
      success: true,
      message: result.message,
      data: result.book
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBookController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await bookService.updateBook(id, req.body);
    res.json({
      success: true,
      message: result.message,
      data: result.book
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteBookController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await bookService.deleteBook(id);
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
}
