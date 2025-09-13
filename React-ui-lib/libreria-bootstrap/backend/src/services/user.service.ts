import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import type { UserDTO } from '../types/books';
import type { CreateUserRequest, UpdateUserRequest } from '../types/books';

export async function getAllUsers(limit = 10, skip = 0): Promise<UserDTO[]> {
  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' },
    take: limit,
    skip,
  });
  return users;
}

export async function countUsers(): Promise<number> {
  return prisma.user.count();
}

export async function getUserById(id: number): Promise<UserDTO> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    const e: any = new Error('Usuario no encontrado');
    e.statusCode = 404;
    throw e;
  }
  return user;
}

export async function createUser(data: CreateUserRequest): Promise<UserDTO> {
  // 1) evitar duplicados
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) {
    const e: any = new Error('Email ya registrado');
    e.statusCode = 409;
    throw e;
  }
  // 2) hash
  const hash = await bcrypt.hash(data.password, 10);

  // 3) crear
  const user = await prisma.user.create({
    data: { email: data.email, username: data.username, password: hash, role: data.role ?? 'user' },
  });
  return user;
}

export async function updateUser(id: number, data: UpdateUserRequest): Promise<UserDTO> {
  try {
    const toUpdate: any = {};
    if (data.email) toUpdate.email = data.email;
    if (data.username)  toUpdate.username  = data.username;
    if (data.role)  toUpdate.role  = data.role;
    if (data.password) {
      toUpdate.password = await bcrypt.hash(data.password, 10);
    }
    const user = await prisma.user.update({
      where: { id },
      data: toUpdate,
    });
    return user;
  } catch (e: any) {
    if (e.code === 'P2025') { // not found
      const err: any = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    }
    if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
      const err: any = new Error('Email ya registrado');
      err.statusCode = 409;
      throw err;
    }
    throw e;
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const err: any = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    }
    throw e;
  }
}