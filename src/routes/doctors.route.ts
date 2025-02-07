import { Router, Request, Response } from 'express';
import { DoctorController } from '../controllers/doctors.controller';

const router = Router();

router.post('/api/v1/doctors', async (req: Request, res: Response) => {
    await DoctorController.createDoctor(req, res);
});

router.get('/api/v1/doctors', async (req: Request, res: Response) => {
    await DoctorController.getAllDoctors(req, res);
});

router.get('/api/v1/doctors/:doctorid', async (req: Request, res: Response) => {
    await DoctorController.getDoctorById(req, res);
});

router.put('/api/v1/doctors/:doctorid', async (req: Request, res: Response) => {
    await DoctorController.updateDoctor(req, res);
});

router.delete('/api/v1/doctors/:doctorid', async (req: Request, res: Response) => {
    await DoctorController.deleteDoctor(req, res);
});

export default router;
