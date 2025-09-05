import e from "express"
import {
  Autor as PrismaAutor,
  User as PrismaUser,
  Comentario as PrismaComentario,
} from "../generated/prisma";


export const SECCIONES = [
  'Filosofos de la antiguedad',
  'Renovadores del renacimiento',
  'Difusores contemporaneos',
  'Populares en la actualidad',
] as const;

export type Seccion = typeof SECCIONES[number];

//interfaces de dominio
export interface UserDTO extends Omit<PrismaUser, "comentarios"> {
  comentarios?: ComentarioDTO[]; // expandido con DTOs
}

export interface AutorDTO extends Omit<PrismaAutor, "books"> {
  books?: BookListDTO[]; // relación expandida
}

export interface ComentarioDTO extends Omit<PrismaComentario, "userId" | "bookId"> {
  user?: UserDTO; // opcionalmente expandido
  book?: BookListDTO;
}

export interface BookListDTO {
  id: number | string;
  titulo: string;
  img?: string | null;
  autor: string;        // nombre plano
  seccion: Seccion;
}

export interface BookDetailDTO extends Omit<BookListDTO, 'autor'> {
  autor: Pick<PrismaAutor, 'id' | 'nombre' | 'epoca'>;
  comentarios?: Array<
    Omit<PrismaComentario, 'userId' | 'bookId'> & { user?: Pick<PrismaUser, 'id' | 'username'> }
  >;
}

// --- Respuestas ---
export interface GetBooksResponse { total: number; books: BookListDTO[]; }
export interface GetBookResponse  { book: BookDetailDTO | null; message?: string; }

export interface PostBookRequest { titulo: string; img?: string | null; autorId: number; seccion: Seccion; }
export interface PostBookResponse { book: BookDetailDTO | null; message: string; }
export interface PutBookRequest   { titulo?: string; img?: string | null; autorId?: number; seccion?: Seccion; }
export interface PutBookResponse  { book: BookDetailDTO | null; message: string; }
export interface DeleteBookResponse { message: string; }