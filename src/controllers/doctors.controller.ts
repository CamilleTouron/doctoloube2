import { Request, Response } from 'express';
import { DoctorService } from '../services/doctor.service';
import { HttpStatusCodes } from '../utils/http-status-codes';

export class DoctorController {
    static async createDoctor(req: Request, res: Response): Promise<Response> {
        const { firstName, lastName, job, email, password } = req.body;

        try {
            const newDoctor = await DoctorService.createDoctor({
                firstName,
                lastName,
                job,
                email,
                password,
            });
            return res.status(HttpStatusCodes.CREATED).json(newDoctor);
        } catch (error) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error creating doctor',
            });
        }
    }

    static async getAllDoctors(req: Request, res: Response): Promise<Response> {
        try {
            const doctors = await DoctorService.getAllDoctors();
            return res.status(HttpStatusCodes.OK).json(doctors);
        } catch (error) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching all doctors',
            });
        }
    }

    static async getDoctorById(req: Request, res: Response): Promise<Response> {
        const { doctorid } = req.params;

        try {
            const doctor = await DoctorService.getDoctorById(parseInt(doctorid));
            if (!doctor) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    message: 'Doctor not found',
                });
            }
            return res.status(HttpStatusCodes.OK).json(doctor);
        } catch (error) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching doctor',
            });
        }
    }

    static async updateDoctor(req: Request, res: Response): Promise<Response> {
        const { doctorid } = req.params;
        const data = req.body;

        try {
            const updatedDoctor = await DoctorService.updateDoctor(parseInt(doctorid), data);
            return res.status(HttpStatusCodes.OK).json(updatedDoctor);
        } catch (error) {
            console.log(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error updating doctor data',
            });
        }
    }

    static async deleteDoctor(req: Request, res: Response): Promise<Response> {
        const { doctorid } = req.params;

        try {
            await DoctorService.deleteDoctor(parseInt(doctorid));
            return res.status(HttpStatusCodes.NO_CONTENT).send();
        } catch (error) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error deleting doctor',
            });
        }
    }

    static async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        try {
            const token = await DoctorService.login(email, password);
            if (!token) {
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                    message: 'Invalid email or password',
                });
            }
            return res.status(HttpStatusCodes.OK).json({ token });
        } catch (error) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                message: 'Invalid email or password',
            });
        }
    }
}
