import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from './http-status-codes';
import { DoctorService } from '../services/doctor.service';

export const authentication = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
        return;
    }

    DoctorService.verifyToken(token)
        .then(decoded => {
            if (!decoded || typeof decoded === 'string') {
                console.log(decoded);
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
            }

            req.body.id = decoded.id;

            if (req.params.doctorid != decoded.id) {
                console.log(req.params.doctorid, decoded.id);
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
            }

            next();
        })
        .catch(() => {
            console.log('catch');
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
        });
};
