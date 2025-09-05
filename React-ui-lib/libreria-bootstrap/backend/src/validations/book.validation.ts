import { z } from 'zod';
import { SECCIONES } from '../types/books';

export const createBookSchema = z.object({
  titulo: z.string().trim().min(1, 'Se requiere un título').max(255, 'El título es demasiado largo'),
  autorId: z.coerce.number().int('Debe ser entero').positive('Debe ser positivo'),
  seccion: z.enum(SECCIONES),
  img: z.string().url('URL inválida').optional().nullable(),
});

export const updateBookSchema = createBookSchema.partial();