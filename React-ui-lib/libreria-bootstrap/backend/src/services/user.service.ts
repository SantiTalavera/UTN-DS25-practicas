import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { CreateUserRequest, UpdateUserRequest, UserDTO } from '../types/books';

export async function getAllUsers(limit:number = 10): Promise<UserDTO[]> {
  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' },
    take: limit,
    omit: { password: true },
  });
  return users;
}

export async function getUserById(id: number): Promise<UserDTO | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
    include: { comentarios: true }, // incluir comentarios sin detalles de libros
  });
  if (!user) {
    const error = new Error('Usuario no encontrado') as any;
    error.status = 404;
    throw error;
  }
  return user;
}

export async function createUser(data: CreateUserRequest): Promise<UserDTO> {
  const existingUser = await prisma.user.findUnique({
    where: { username: data.username },
  });
    if (existingUser) {
        const error = new Error('El nombre de usuario ya existe') as any;
        error.status = 409;
        throw error;
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
        data: {
        ...data,
        password: hashedPassword,
        },
        omit: { password: true },
    });
    return newUser;
}

export async function updateUser(id: number, data: UpdateUserRequest): Promise<UserDTO> {
    try {
        const updateData: Partial<UpdateUserRequest> = { ...data };
        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }
        else {
            delete (updateData as any).password;
        }
        return await prisma.user.update({
            where: { id },
            data: updateData,
            omit: { password: true },
        });
    }
    catch (e: any) {
        if (e.code === 'P2025') {
            const error = new Error('Usuario no encontrado') as any;
            error.status = 404;
            throw error;
        }
        throw e;
    }
}

export async function deleteUser(id: number): Promise<void> {
    try {
        await prisma.user.delete({
            where: { id },
        });
    }   
    catch (e: any) {
        if (e.code === 'P2025') {
            const error = new Error('Usuario no encontrado') as any;
            error.status = 404;
            throw error;
        }
        throw e;
    }
}