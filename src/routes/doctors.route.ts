import { Router, Request, Response } from 'express';
import { DoctorController } from '../controllers/doctors.controller';
import { retrieveCacheMiddleware, cacheMiddleware } from '../utils/cache';
import {authentication} from "../utils/authentification";

const router = Router();

router.post('/api/v1/doctors', async (req: Request, res: Response) => {
    await DoctorController.createDoctor(req, res);
});

router.get('/api/v1/doctors', retrieveCacheMiddleware, async (req: Request, res: Response) => {
    await DoctorController.getAllDoctors(req, res);
}, cacheMiddleware);

router.get('/api/v1/doctors/:doctorid', retrieveCacheMiddleware, async (req: Request, res: Response) => {
    await DoctorController.getDoctorById(req, res);
}, cacheMiddleware);

router.put('/api/v1/doctors/:doctorid', authentication, async (req: Request, res: Response) => {
    await DoctorController.updateDoctor(req, res);
});

router.delete('/api/v1/doctors/:doctorid', async (req: Request, res: Response) => {
    await DoctorController.deleteDoctor(req, res);
});

router.post('/api/v1/doctors/login', async (req: Request, res: Response) => {
    await DoctorController.login(req, res);
});

export default router;
