import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma';

type JWTRole = 'USER' | 'ADMIN';
type JWTPayload = { 
    sub: number;
    email: string; 
    role: JWTRole;
};

export async function loginService(email: string, password: string) {
    // 1) Buscar usuario por email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  // 2) Comparar contraseña
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Credenciales inválidas');

  // 3) Firmar JWT
  const JWT_SECRET = process.env.JWT_SECRET as Secret | undefined;
  if (!JWT_SECRET) {
    throw new Error('Falta JWT_SECRET en .env');
  }
  const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '2h';

  const payload: JWTPayload = {
    sub: user.id,
    email: user.email,
    role: user.role as JWTRole,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN } as SignOptions);

  // 4) Devolver info segura (sin hash)
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}