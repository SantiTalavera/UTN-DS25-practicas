import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from '../config/prisma'
import { loginService } from './auth.service'
import { sign } from 'crypto';

jest.mock('../config/prisma', () => ({
  __esModule: true,
  default: {
    user: { findUnique: jest.fn() },
  },
}));
jest.mock('bcrypt', () => ({
  __esModule: true,
  default: {
    compare: jest.fn<Promise<boolean>, [string, string]>(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  default: {
    sign: jest.fn<string, [any, string, jwt.SignOptions?]>(),
  },
}));

const prismaMock = prisma as jest.Mocked<typeof prisma>
const compareMock = bcrypt.compare as jest.MockedFunction<
  (data: string, hash: string) => Promise<boolean>
>;
const signMock = jwt.sign as jest.MockedFunction<typeof jwt.sign>;

describe('auth.service – loginService', () => {
  const originalEnv = process.env
  const SECRET='test-secret';

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv, JWT_SECRET: SECRET, JWT_EXPIRES_IN: '2h' }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  test('retorna token y datos del usuario cuando las credenciales son válidas', async () => {
    // Arrange
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'admin@test.com',
      username: 'admin',
      password: 'hashed',
      role: 'admin',
    } as any)
    compareMock.mockResolvedValue(true as any)
    signMock.mockReturnValue('signed-token' as any)

    // Act
    const result = await loginService('admin@test.com', 'Secreta123')

    // Assert
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: 'admin@test.com' } })
    expect(compareMock).toHaveBeenCalledWith('Secreta123', 'hashed')
    expect(signMock).toHaveBeenCalledWith(
      { sub: 1, email: 'admin@test.com', role: 'admin' },
      SECRET,
      { expiresIn: '2h' },
    )
    expect(result).toEqual({
      token: 'signed-token',
      user: { id: 1, username: 'admin', email: 'admin@test.com', role: 'admin' },
    })
  })

  test('lanza error si el usuario no existe', async () => {
    // Arrange
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null)

    // Act y Assert
    await expect(loginService('ghost@test.com', 'pass')).rejects.toThrow('Credenciales inválidas')
    expect(compareMock).not.toHaveBeenCalled()
    expect(signMock).not.toHaveBeenCalled()
  })

  test('lanza error si la contraseña es incorrecta', async () => {
    // Arrange
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
      id: 2,
      email: 'user@test.com',
      username: 'user',
      password: 'hashed',
      role: 'user',
    } as any)
    compareMock.mockResolvedValue(false as any)

    // Act y Assert
    await expect(loginService('user@test.com', 'wrong')).rejects.toThrow('Credenciales inválidas')
    expect(signMock).not.toHaveBeenCalled()
  })

  test('lanza error si falta JWT_SECRET', async () => {
    // Arrange
    Reflect.deleteProperty(process.env, 'JWT_SECRET');
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
      id: 3,
      email: 'admin@test.com',
      username: 'admin',
      password: 'hashed',
      role: 'admin',
    } as any)
    compareMock.mockResolvedValue(true as any)

    // Act y Assert
    await expect(loginService('admin@test.com', 'Secreta123')).rejects.toThrow('Falta JWT_SECRET en .env');
    expect(signMock).not.toHaveBeenCalled();
  })
})