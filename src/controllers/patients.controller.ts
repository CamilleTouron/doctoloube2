import { Request, Response } from 'express';
import { PatientService } from '../services/patients.service';
import { HttpStatusCodes } from '../utils/http-status-codes';

export class PatientController {
    static async createPatient(req: Request, res: Response): Promise<Response> {
        const { firstName, lastName, birthDate, doctorId } = req.body;

        try {
            const newPatient = await PatientService.createPatient({
                firstName,
                lastName,
                birthDate: new Date(birthDate),
                doctorId,
            });
            return res.status(HttpStatusCodes.CREATED).json(newPatient);
        } catch (error) {
            console.error(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error creating patient',
            });
        }
    }

    static async getAllPatients(req: Request, res: Response): Promise<Response> {
        try {
            const patients = await PatientService.getAllPatients();
            return res.status(HttpStatusCodes.OK).json(patients);
        } catch (error) {
            console.error(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching all patients',
            });
        }
    }

    static async getPatientById(req: Request, res: Response): Promise<Response> {
        const { patientid } = req.params;

        try {
            const patient = await PatientService.getPatientById(parseInt(patientid));
            if (!patient) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    message: 'Patient not found',
                });
            }
            return res.status(HttpStatusCodes.OK).json(patient);
        } catch (error) {
            console.error(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching patient',
            });
        }
    }

    static async getAppointments(req: Request, res: Response): Promise<Response> {
        const { patientid } = req.params;

        try {
            const appointments = await PatientService.getAppointments(parseInt(patientid));
            if (!appointments) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    message: 'No appointments found for this patient',
                });
            }
            return res.status(HttpStatusCodes.OK).json(appointments);
        } catch (error) {
            console.error(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching appointments',
            });
        }
    }

    static async getTelephones(req: Request, res: Response): Promise<Response> {
        const { patientid } = req.params;

        try {
            const telephones = await PatientService.getTelephones(parseInt(patientid));
            if (!telephones) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    message: 'No telephones found for this patient',
                });
            }
            return res.status(HttpStatusCodes.OK).json(telephones);
        } catch (error) {
            console.error(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching telephones',
            });
        }
    }

    static async assignDoctor(req: Request, res: Response): Promise<Response> {
        const { patientid, doctorid } = req.params;

        try {
            const updatedPatient = await PatientService.assignDoctor(
                parseInt(patientid),
                parseInt(doctorid)
            );

            return res.status(HttpStatusCodes.OK).json(updatedPatient);
        } catch (error) {
            console.error(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error assigning doctor to patient',
            });
        }
    }

    static async updatePatient(req: Request, res: Response): Promise<Response> {
        const { patientid } = req.params;
        const data = req.body;

        try {
            const updatedPatient = await PatientService.updatePatient(
                parseInt(patientid),
                data
            );
            return res.status(HttpStatusCodes.OK).json(updatedPatient);
        } catch (error) {
            console.error(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error updating patient data',
            });
        }
    }

    static async deletePatient(req: Request, res: Response): Promise<Response> {
        const { patientid } = req.params;

        try {
            await PatientService.deletePatient(parseInt(patientid));
            return res.status(HttpStatusCodes.NO_CONTENT).send();
        } catch (error) {
            console.error(error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error deleting patient',
            });
        }
    }
}
