import { getBookById } from './book.service';
import prisma from '../config/prisma';
import { toDetailDTO } from './book.service';
// Mock de Prisma (para no usar BD real)
jest.mock('../config/prisma', () => ({
    book: {
        findUnique: jest.fn()
    }
}));

describe('BookService - getBookById', () => {
    test('debe retornar un libro cuando existe', async () => {
        // ARRANGE: Preparar datos de prueba
        const mockBook = { id: 1, titulo: 'Meditaciones', seccion: 'Filosofos_de_la_antiguedad', img: null
            , autor: { id: 1, nombre: 'Marco Aurelio', epoca: 'Edad Antigua'}
         };
        (prisma.book.findUnique as jest.Mock).mockResolvedValue(mockBook);
        // ACT: Ejecutar función
        const result = await getBookById(1);
        // ASSERT: Verificar resultado
        expect(result).toEqual(toDetailDTO(mockBook as any));
        expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 }, include: { autor: true } });
    });
    test('debe lanzar error 404 cuando no existe', async () => {
        // ARRANGE: Simular que no hay libro
        (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);
     // ACT & ASSERT: Verificar que lanza error
        await expect(getBookById(999)).rejects.toThrow('Libro no encontrado');
    });
});