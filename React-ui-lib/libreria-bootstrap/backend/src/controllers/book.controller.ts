// src/controllers/book.controller.ts
import { Request, Response, NextFunction } from "express";
import * as service from "../services/book.service";

export async function getAllBooksController(_req: Request, res: Response, next: NextFunction) {
  try {
    const payload = await service.getAllBooks();
    res.status(200).json(payload); // { books, total }
  } catch (err) { next(err); }
}

export async function getBookByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const book = await service.getBookById(id);
    res.status(200).json({ book });
  } catch (err) { next(err); }
}

export async function createBookController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await service.createBook(req.body);
    const code = result.book ? 201 : 400;
    res.status(code).json(result); // { book|null, message }
  } catch (err) { next(err); }
}

export async function updateBookController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const result = await service.updateBook(id, req.body);
    const code = result.book ? 200 : 404;
    res.status(code).json(result); // { book|null, message }
  } catch (err) { next(err); }
}

export async function deleteBookController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const result = await service.deleteBook(id);
    const code = result.message.includes('no encontrado') ? 404 : 200;
    res.status(code).json(result); // { message }
  } catch (err) { next(err); }
}
