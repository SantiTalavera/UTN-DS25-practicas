import e from "express"

export type Seccion = "Filosofos de la antiguedad" | "Renovadores del Renacimiento" | "Difusores contemporaneos" | "Populares en la actualidad";

export interface Book{
    titulo: string,
    img?: string,
    autor:string,
    seccion: Seccion
}

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
    titulo: string,
    img?: string,
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