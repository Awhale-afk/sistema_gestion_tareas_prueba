import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Se saca del formato "Bearer token"//

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No existe token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded; //Se guardan los datos del usuario en la petición//
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado." });
    }
};