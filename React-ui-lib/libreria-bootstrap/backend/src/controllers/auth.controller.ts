import { Request,Response,NextFunction } from "express";
import * as authService from "../services/auth.service";

export async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body as { email: string; password: string };
        const result = await authService.loginService(email, password);
        res.json({success: true, data: result});
    } catch (error) {
        next(error);
    }
}