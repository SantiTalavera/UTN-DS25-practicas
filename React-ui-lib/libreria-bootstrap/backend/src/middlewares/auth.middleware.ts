import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { success } from "zod";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username: string;
                role: 'admin' | 'user';
            }
        }
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
 try{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({success:false ,message: 'Token no proporcionado' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role
    };
    next();
}
catch(error: any){
    console.error(error);
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({success:false ,message: 'Token expirado' });
    }
    res.status(401).json({success:false ,message: 'Token inválido' });
}
}

export function authorize(...roles: String[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({success:false ,message: 'No autenticado' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({success:false ,message: 'No autorizado' });
        }
        next();
    };
}