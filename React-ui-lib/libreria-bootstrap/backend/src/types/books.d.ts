import e from "express"
import {
  Book as PrismaBook,
  Autor as PrismaAutor,
  User as PrismaUser,
  Comentario as PrismaComentario,
  Section as PrismaSection,
} from "@prisma/client";


export type Seccion = "Filosofos de la antiguedad" | "Renovadores del renacimiento" | "Difusores contemporaneos" | "Populares en la actualidad";

//interfaces de dominio
export interface UserDTO extends Omit<PrismaUser, "comentarios"> {
  comentarios?: ComentarioDTO[]; // expandido con DTOs
}

export interface AutorDTO extends Omit<PrismaAutor, "books"> {
  books?: BookDTO[]; // relación expandida
}

export interface ComentarioDTO extends Omit<PrismaComentario, "userId" | "bookId"> {
  user?: UserDTO; // opcionalmente expandido
  book?: BookDTO;
}

export interface BookDTO extends Omit<PrismaBook, "seccion" | "autorId"> {
  seccion: Seccion;     // enum legible en vez del enum Prisma
  autor?: AutorDTO;     // relación expandida
  comentarios?: ComentarioDTO[];
}

//Interfaces para las operaciones de la API
// GET /books
export interface GetBooksResponse {
  total: number;
  books: BookDTO[];
}

// GET /books/:id
export interface GetBookResponse {
  book: BookDTO | null;
  message?: string;
}

// POST /books
export interface PostBookRequest {
  titulo: string;
  img?: string | null;
  autorId: number;
  seccion: Seccion;
}

export interface PostBookResponse {
  book: BookDTO | null;
  message: string;
}

// PUT /books/:id
export interface PutBookRequest {
  titulo?: string;
  img?: string | null;
  autorId?: number;
  seccion?: Seccion;
}

export interface PutBookResponse {
  message: string;
}

// DELETE /books/:id
export interface DeleteBookResponse {
  message: string;
}