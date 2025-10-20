import type { Request, Response, NextFunction } from 'express';
import { createBookController } from './book.controller';
import * as bookService from '../services/book.service';

jest.mock('../services/book.service');

describe('BookController - createBookController', () => {
  const mockReq = (): Partial<Request> => ({
    body: {
      titulo: 'Meditaciones',
      img: null,
      autorId: 7,
      seccion: 'Filosofos de la antiguedad',
    },
  });

  const mockRes = (): Partial<Response> => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  });

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    next = jest.fn();
    jest.clearAllMocks();
  });

  test('debe responder 201 y el libro creado cuando el servicio tiene éxito', async () => {
    // ARRANGE: Preparar datos de prueba
    const payload = {
      book: { id: 1, titulo: 'Meditaciones' },
      message: 'Libro creado exitosamente',
    };
    (bookService.createBook as jest.Mock).mockResolvedValue(payload);

    // ACT: Ejecutar función
    await createBookController(req as Request, res as Response, next);

    // ASSERT: Verificar resultados
    expect(bookService.createBook).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(payload);
    expect(next).not.toHaveBeenCalled();
  });

  test('debe responder 400 cuando el servicio devuelve book null', async () => {
    // Arrange: Preparar datos de prueba
    const payload = { book: null, message: 'Ya existe un libro con ese título y autor' };
    (bookService.createBook as jest.Mock).mockResolvedValue(payload);

    // Act: Ejecutar función
    await createBookController(req as Request, res as Response, next);

    // Assert: Verificar resultados
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(payload);
    expect(next).not.toHaveBeenCalled();
  });

  test('debe delegar en next cuando el servicio arroja un error', async () => {
    // Arrange: Preparar error simulado
    const boom = new Error('boom');
    (bookService.createBook as jest.Mock).mockRejectedValue(boom);

    // Act: Ejecutar función
    await createBookController(req as Request, res as Response, next);

    // Assert: Verificar resultados
    expect(next).toHaveBeenCalledWith(boom);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});