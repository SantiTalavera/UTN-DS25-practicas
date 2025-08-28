import prisma from '../config/prisma';
import {
  Book as BookPrisma,
  Section as SectionPrisma,
  Autor as AutorPrisma
} from '../generated/prisma';

import {
  BookDTO,
  Seccion as SeccionDTO,
  GetBooksResponse,
  PostBookRequest,
  PutBookRequest,
  PostBookResponse,
  DeleteBookResponse,
} from '../types/books';

// --- MAPEO DE ENUMS ---
// Convierte el enum de la API (con espacios) al enum de Prisma (con guiones bajos)
const seccionDtoToPrisma = (seccion: SeccionDTO): SectionPrisma => {
  const map: Record<SeccionDTO, SectionPrisma> = {
    'Filosofos de la antiguedad': 'Filosofos_de_la_antiguedad',
    'Renovadores del renacimiento': 'Renovadores_del_renacimiento',
    'Difusores contemporaneos': 'Difusores_contemporaneos',
    'Populares en la actualidad': 'Populares_de_la_actualidad',
  };
  return map[seccion];
};

// Convierte el enum de Prisma al de la API
const sectionPrismaToDto = (section: SectionPrisma): SeccionDTO => {
  const map: Record<SectionPrisma, SeccionDTO> = {
    Filosofos_de_la_antiguedad: 'Filosofos de la antiguedad',
    Renovadores_del_renacimiento: 'Renovadores del renacimiento',
    Difusores_contemporaneos: 'Difusores contemporaneos',
    Populares_de_la_actualidad: 'Populares en la actualidad',
  };
  return map[section];
};

// --- FUNCIÓN UTILITARIA ---
// Convierte un objeto de la base de datos (Prisma) a un objeto para la API (DTO)
function toBookDTO(book: BookPrisma & { autor?: AutorPrisma }): BookDTO {
  return {
    id: book.id,
    titulo: book.titulo,
    img: book.img,
    autor: book.autor ? { id: book.autor.id, nombre: book.autor.nombre, epoca: book.autor.epoca, books: [] } : undefined,
    seccion: sectionPrismaToDto(book.seccion),
  };
}

// --- LÓGICA DEL SERVICIO ---

export async function getAllBooks(): Promise<GetBooksResponse> {
  const booksFromDB = await prisma.book.findMany({
    include: { autor: true },
    orderBy: { id: 'asc' }
  });

  const booksDTO = booksFromDB.map(toBookDTO);
  return { books: booksDTO, total: booksDTO.length };
}


export async function getBookById(id: number): Promise<BookDTO> {
  const book = await prisma.book.findUnique({
    where: { id },
    include: { autor: true }
  });

  if (!book) {
    const error = new Error('Libro no encontrado');
    (error as any).statusCode = 404;
    throw error;
  }

  return toBookDTO(book);
}

export async function createBook(data: PostBookRequest): Promise<PostBookResponse> {
  // Verificar que el autor exista
  const authorExists = await prisma.autor.findUnique({
    where: { id: data.autorId }
  });
  if (!authorExists) {
    return { book: null, message: 'El autor no existe' };
  }

  // Evitar duplicados por título
  const exists = await prisma.book.count({
    where: { titulo: data.titulo.trim(), autorId: data.autorId }
  });
  if (exists > 0) {
    return { book: null, message: 'Ya existe un libro con ese título y autor' };
  }

  const createdBook = await prisma.book.create({
    data: {
      titulo: data.titulo.trim(),
      img: data.img ?? null,
      seccion: seccionDtoToPrisma(data.seccion),
      autor: { connect: { id: data.autorId } }
    },
    include: { autor: true }
  });

  return { book: toBookDTO(createdBook), message: 'Libro creado exitosamente' };
}


export async function updateBook(id: number, data: PutBookRequest): Promise<PostBookResponse> {
  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        titulo: data.titulo?.trim(),
        img: data.img ?? undefined,
        seccion: data.seccion ? seccionDtoToPrisma(data.seccion) : undefined,
        autor: data.autorId ? { connect: { id: data.autorId } } : undefined
      },
      include: { autor: true }
    });

    return { book: toBookDTO(updatedBook), message: 'Libro actualizado exitosamente' };
  } catch (e: any) {
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
