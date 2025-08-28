import {z} from 'zod';

export const createBookSchema = z.object({
  titulo: z.string().min(1, 'Se requiere un título').max(255, 'El título es demasiado largo').trim(),
  autorId: z.number().int('El ID del autor debe ser un número entero').positive('El ID del autor debe ser un número positivo'),
  seccion: z.enum(['Filosofos de la antiguedad', 'Renovadores del renacimiento', 'Difusores contemporaneos', 'Populares en la actualidad']), 
})

export const updateBookSchema = createBookSchema.partial();