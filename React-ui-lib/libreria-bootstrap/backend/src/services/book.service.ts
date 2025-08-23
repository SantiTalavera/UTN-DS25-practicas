import prisma from '../config/prisma';
import {
  // Tipos generados automáticamente por Prisma
  book as BookPrisma,
  Section as SectionPrisma
} from '../generated/prisma';
import {
  // Tipos personalizados (DTOs) para la API
  Book as BookDTO,
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
    'Renovadores del Renacimiento': 'Renovadores_Del_renacimiento', // Corregido el typo
    'Difusores contemporaneos': 'Difusores_contemporaneos',
    'Populares en la actualidad': 'Populares_de_la_actualidad',
  };
  return map[seccion];
};

// Convierte el enum de Prisma al de la API
const sectionPrismaToDto = (section: SectionPrisma): SeccionDTO => {
  const map: Record<SectionPrisma, SeccionDTO> = {
    Filosofos_de_la_antiguedad: 'Filosofos de la antiguedad',
    Renovadores_Del_renacimiento: 'Renovadores del Renacimiento',
    Difusores_contemporaneos: 'Difusores contemporaneos',
    Populares_de_la_actualidad: 'Populares en la actualidad',
  };
  return map[section];
};


// --- FUNCIÓN UTILITARIA ---
// Convierte un objeto de la base de datos (Prisma) a un objeto para la API (DTO)
function toBookDTO(book: BookPrisma): BookDTO {
  return {
    id: book.id, 
    titulo: book.title,
    img: book.url,
    autor: book.author,
    seccion: sectionPrismaToDto(book.section),
  };
}


// --- LÓGICA DEL SERVICIO ---

/**
 * Obtiene todos los libros y los devuelve en formato DTO.
 */
export async function getAllBooks(): Promise<GetBooksResponse> {
  const booksFromDB = await prisma.book.findMany({
    orderBy: { id: 'asc' }
  });

  // Mapeo cada libro al formato DTO antes de enviarlo
  const booksDTO = booksFromDB.map(toBookDTO);

  return {
    books: booksDTO,
    total: booksDTO.length
  };
}

/**
 * Obtiene un libro por su ID.
 * Si no lo encuentra, lanza un error.
 */
export async function getBookById(id: number): Promise<BookDTO> {
  const book = await prisma.book.findUnique({
    where: { id }
  });

  if (!book) {
    const error = new Error('Libro no encontrado');
    (error as any).status = 404;
    throw error;
  }

  return toBookDTO(book);
}

/**
 * Crea un nuevo libro en la base de datos.
 */
export async function createBook(data: PostBookRequest): Promise<PostBookResponse> {
  // Validaciones
  if (!data.titulo?.trim() || !data.autor?.trim() || !data.seccion) {
    return { book: null, message: 'Faltan campos obligatorios: titulo, autor, seccion' };
  }
  if (!data.img?.trim()) {
    return { book: null, message: 'El campo img (url) es obligatorio' };
  }

  // Evitar duplicados
  const exists = await prisma.book.count({
    where: { title: data.titulo.trim(), author: data.autor.trim() }
  });
  if (exists > 0) {
    return { book: null, message: 'Ya existe un libro con ese título y autor' };
  }

  const createdBook = await prisma.book.create({
    data: {
      title: data.titulo.trim(),
      author: data.autor.trim(),
      url: data.img.trim(),
      section: seccionDtoToPrisma(data.seccion), // Uso el mapeo
    }
  });

  return {
    book: toBookDTO(createdBook),
    message: 'Libro creado exitosamente'
  };
}

/**
 * Actualiza un libro existente usando su ID.
 */
export async function updateBook(id: number, data: PutBookRequest): Promise<PostBookResponse> {
  // Verificamos primero si el libro existe
  const existingBook = await prisma.book.count({ where: { id } });
  if (existingBook === 0) {
    return { book: null, message: 'Libro no encontrado' };
  }

  // Construimos el objeto de actualización dinámicamente
  const dataToUpdate: Partial<BookPrisma> = {};
  if (data.titulo) dataToUpdate.title = data.titulo.trim();
  if (data.autor) dataToUpdate.author = data.autor.trim();
  if (data.img) dataToUpdate.url = data.img.trim();
  if (data.seccion) dataToUpdate.section = seccionDtoToPrisma(data.seccion);

  const updatedBook = await prisma.book.update({
    where: { id },
    data: dataToUpdate,
  });

  return {
    book: toBookDTO(updatedBook),
    message: 'Libro actualizado exitosamente'
  };
}

/**
 * Elimina un libro por su ID.
 */
export async function deleteBook(id: number): Promise<DeleteBookResponse> {
  try {
    await prisma.book.delete({
      where: { id }
    });
    return { message: 'Libro eliminado exitosamente' };
  } catch (error) {
    // Prisma lanza un error si el registro a eliminar no existe
    return { message: 'Libro no encontrado' };
  }
}
