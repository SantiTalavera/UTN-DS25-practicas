import { Request,Response,NextFunction } from "express";
import * as authService from "../services/auth.service";
import { LoginRequest, LoginResponse } from "../types/auth";
import { success } from "zod";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authService.login(req.body);
        res.json({success: true, data: result});
    } catch (error) {
        next(error);
    }
}