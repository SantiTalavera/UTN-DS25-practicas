import { Request, Response, NextFunction } from 'express';
import { 
    Book, 
    GetBooksResponse, 
    GetBookRequest, 
    GetBookResponse, 
    PostBookRequest, 
    PostBookResponse, 
    PutBookRequest, 
    PutBookResponse, 
    DeleteBookRequest, 
    DeleteBookResponse} from '../types/books';
import { getAllBooks, getBookByTitle, createBook, updateBook, deleteBook} from '../services/book.service';

// Obtener todos los Books
export async function getAllBooksController( req: Request, res: Response<GetBooksResponse>, next: NextFunction) {
    try {
        const result = await getAllBooks();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

// Obtener Book por username
export async function getBookByTitleController( req: Request<{ titulo: string }>, res: Response<GetBookResponse>, next: NextFunction) {
    try {
        const titulo = req.params.titulo;
        const result = await getBookByTitle({titulo});
        if (result.book) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ book: null, message: 'Libro no encontrado' });
        }
    } catch (error) {
        next(error);
    }
}

// Crear Book
export async function createBookController(req: Request<{}, PostBookResponse, PostBookRequest>, res: Response<PostBookResponse>, next: NextFunction) {
    try {
        const { titulo, autor, seccion } = req.body;
        if (!titulo || !autor || !seccion) {
            return res.status(400).json({
                book: null,
                message: 'Faltan datos obligatorios'
            });
        }
        const result = await createBook(req.body);
        if (result.book) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        next(error);
    }
}
// Actualizar Book por username
export async function updateBookController(req: Request<{ titulo: string }, PutBookResponse, PutBookRequest>, res: Response<PutBookResponse>, next: NextFunction) {
    try {
        const titulo = req.params.titulo;
        const result = await updateBook(titulo, req.body);
        if (result.message === 'Libro actualizado exitosamente') {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        next(error);
    }
}

// Eliminar Book por username
export async function deleteBookController(
    req: Request<{ titulo: string }>,
    res: Response<DeleteBookResponse>,
    next: NextFunction
) {
    try {
        const titulo = req.params.titulo;
        const result = await deleteBook(titulo);
        if (result.message === 'Libro eliminado exitosamente') {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        next(error);
    }
}