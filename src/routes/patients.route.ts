import { Router, Request, Response } from 'express';
import { PatientController } from '../controllers/patients.controller';

const router = Router();

router.post('/api/v1/patients', async (req: Request, res: Response) => {
    await PatientController.createPatient(req, res);
});

router.get('/api/v1/patients', async (req: Request, res: Response) => {
    await PatientController.getAllPatients(req, res);
});

router.get('/api/v1/patients/:patientid', async (req: Request, res: Response) => {
    await PatientController.getPatientById(req, res);
});

router.get('/api/v1/patients/:patientid/appointments', async (req: Request, res: Response) => {
    await PatientController.getAppointments(req, res);
});

router.get('/api/v1/patients/:patientid/telephones', async (req: Request, res: Response) => {
    await PatientController.getTelephones(req, res);
});

router.put('/api/v1/patients/:patientid/doctors/:doctorid', async (req: Request, res: Response) => {
    await PatientController.assignDoctor(req, res);
});

router.put('/api/v1/patients/:patientid', async (req: Request, res: Response) => {
    await PatientController.updatePatient(req, res);
});

router.delete('/api/v1/patients/:patientid', async (req: Request, res: Response) => {
    await PatientController.deletePatient(req, res);
});

export default router;
