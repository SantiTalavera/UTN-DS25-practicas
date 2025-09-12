import {z} from 'zod';

export const createUserSchema = z.object({
    username: z.string().toLowerCase().trim(),
    password: z.string().min(8).max(32).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, 'La contraseña debe contener por lo menos una mayuscula, una minsucula, un numero, y un caracter especial.'),
    name: z.string().min(2).max(32).trim(),
    role: z.enum(['admin', 'user']).optional().default('user'),
});

export const updateUserSchema = createUserSchema.partial();