// src/services/book.service.ts
import prisma from '../config/prisma';
import { Autor, Book } from '../generated/prisma';
import {
  GetBooksResponse, BookListDTO, BookDetailDTO,
  PostBookRequest, PutBookRequest, PostBookResponse, PutBookResponse, DeleteBookResponse
} from '../types/books';
import { toPrismaSection, toSeccionLabel } from './section.map';

// --- mapeos ---
type BookWithAuthor = Book & { autor: Autor };

const toListDTO = (b: BookWithAuthor): BookListDTO => ({
  id: b.id,
  titulo: b.titulo,
  img: b.img ?? null,
  autor: b.autor?.nombre ?? '',
  seccion: toSeccionLabel(b.seccion),
});

const toDetailDTO = (b: BookWithAuthor): BookDetailDTO => ({
  id: b.id,
  titulo: b.titulo,
  img: b.img ?? null,
  autor: { id: b.autor.id, nombre: b.autor.nombre, epoca: b.autor.epoca },
  seccion: toSeccionLabel(b.seccion),
});

// --- operaciones ---
export async function getAllBooks(): Promise<GetBooksResponse> {
  const [rows, total] = await Promise.all([
    prisma.book.findMany({ include: { autor: true }, orderBy: { id: 'asc' } }),
    prisma.book.count(),
  ]);
  return { books: rows.map(toListDTO), total };
}

export async function getBookById(id: number): Promise<BookDetailDTO> {
  const book = await prisma.book.findUnique({ where: { id }, include: { autor: true } });
  if (!book) {
    const err = new Error('Libro no encontrado');
    (err as any).statusCode = 404;
    throw err;
  }
  return toDetailDTO(book);
}

export async function createBook(data: PostBookRequest): Promise<PostBookResponse> {
  // autor existente
  const authorExists = await prisma.autor.findUnique({ where: { id: data.autorId } });
  if (!authorExists) return { book: null, message: 'El autor no existe' };

  // duplicado por (titulo, autorId)
  const dup = await prisma.book.count({ where: { titulo: data.titulo.trim(), autorId: data.autorId } });
  if (dup) return { book: null, message: 'Ya existe un libro con ese título y autor' };

  const created = await prisma.book.create({
    data: {
      titulo: data.titulo.trim(),
      img: data.img ?? null,
      seccion: toPrismaSection(data.seccion),
      autor: { connect: { id: data.autorId } },
    },
    include: { autor: true },
  });

  return { book: toDetailDTO(created), message: 'Libro creado exitosamente' };
}

export async function updateBook(id: number, data: PutBookRequest): Promise<PutBookResponse> {
  try {
    const updated = await prisma.book.update({
      where: { id },
      data: {
        ...(data.titulo ? { titulo: data.titulo.trim() } : {}),
        ...(data.img !== undefined ? { img: data.img } : {}),
        ...(data.seccion ? { seccion: toPrismaSection(data.seccion) } : {}),
        ...(data.autorId ? { autor: { connect: { id: data.autorId } } } : {}),
      },
      include: { autor: true },
    });
    return { book: toDetailDTO(updated), message: 'Libro actualizado exitosamente' };
  } catch (e: any) {
    if (e.code === 'P2002') {
      return { book: null, message: 'Ya existe un libro con ese título y autor' };
    }
    if (e.code === 'P2025') {
      return { book: null, message: 'Libro no encontrado' };
    }
    throw e;
  }
}

export async function deleteBook(id: number): Promise<DeleteBookResponse> {
  try {
    await prisma.book.delete({ where: { id } });
    return { message: 'Libro eliminado exitosamente' };
  } catch (e: any) {
    if (e.code === 'P2025') return { message: 'Libro no encontrado' };
    throw e;
  }
}
