import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {LoginRequest, LoginResponse} from "../types/auth";

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const user = await prisma.user.findUnique({
        where: {username: data.username}
    });
    if (!user) {
        const error = new Error("Credenciales invalidas")as any;
        error.status = 401;
        throw error;
    }
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
        const error = new Error("Credenciales invalidas")as any;
        error.status = 401;
        throw error;
    }
    const token = jwt.sign(
        {id: user.id, username: user.username, role: user.role},    
        process.env.JWT_SECRET !, 
        {expiresIn: process.env.JWT_SECRET_EXPIRES_IN}
    );
    const {password: _, ...userWithoutPassword} = user;
    return {user: userWithoutPassword, token};
}
