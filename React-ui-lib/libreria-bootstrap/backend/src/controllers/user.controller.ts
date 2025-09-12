import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { CreateUserRequest, UpdateUserRequest, UserResponse, UsersListResponse } from "../types/books";

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await userService.getAllUsers();
        res.json({total: users.length, users, message: "Usuarios obtenidos con exito"} as UsersListResponse);
    } catch (error) {
        next(error);
    }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        res.json({user, message: "Usuario obtenido con exito"} as UserResponse);
    } catch (error) {
        next(error);
    }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const data: CreateUserRequest = req.body;
        const newUser = await userService.createUser(data);
        res.status(201).json({user: newUser, message: "Usuario creado con exito"} as UserResponse);
    } catch (error) {
        next(error);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        const data: UpdateUserRequest = req.body;
        const updatedUser = await userService.updateUser(id, data);
        res.json({user: updatedUser, message: "Usuario actualizado con exito"} as UserResponse);
    } catch (error) {
        next(error);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        await userService.deleteUser(id);
        res.json({message: "Usuario eliminado con exito"});
    } catch (error) {
        next(error);
    }
}
