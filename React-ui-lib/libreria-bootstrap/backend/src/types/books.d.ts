import e from "express"

export type Seccion = "Filosofos de la antiguedad" | "Renovadores del renacimiento" | "Difusores contemporaneos" | "Populares en la actualidad";

//interfaces de dominio
export interface User{
    id: number,
    username: string,
    password: string
    comentarios: Comentario[]
}

export interface Book{
    id: number,
    titulo: string,
    img?: string | null,
    autor: Autor,
    seccion: Seccion
    obs?: Observacion[]
}

export interface Autor{
    id: number,
    nombre: string
    epoca: string
    books: Book[]
}

export interface Comentario {
    texto?: string | null
    userId: number
    bookId: number
}

//interafaces de requests y responses
export interface GetBooksResponse {
    total: number,
    books: Book[]
}

export interface GetBookRequest{
    titulo: string;
}

export interface GetBookResponse{
    book: Book | null,
    message?: string
}

export interface PostBookRequest{
    id: number,
    titulo: string,
    img?: string | null,
    autor: string,
    seccion: Seccion
}

export interface PostBookResponse{
    book: Book | null,
    message: string
}

export interface PutBookRequest{
    titulo: string,
    img?:string,
    autor:string,
    seccion:Seccion
}

export interface PutBookResponse{
    message: string
}

export interface DeleteBookRequest{
    titulo: string
}

export interface DeleteBookResponse{
    message: string
}
