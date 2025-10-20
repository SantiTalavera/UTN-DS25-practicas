import { getUserById } from './user.service';
import prisma from '../config/prisma';
// Mock de Prisma (para no usar BD real)
jest.mock('../config/prisma', () => ({
    user: {
        findUnique: jest.fn()
    }
}));

describe('UserService - getUserById', () => {
    test('debe retornar un usuario cuando exista', async () => {
        // ARRANGE: Preparar datos de prueba
        const mockUser = { id: 1, email: 'usuario1@gmail.com', password: 'contra123', role: 'admin'};
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        // ACT: Ejecutar función
        const result = await getUserById(1);
        // ASSERT: Verificar resultado
        expect(result).toEqual(mockUser);
        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    test('debe lanzar error 404 cuando no exista', async () => {
        // ARRANGE: Simular que no hay libro
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
     // ACT & ASSERT: Verificar que lanza error
        await expect(getUserById(999)).rejects.toThrow('Usuario no encontrado');
    });
});