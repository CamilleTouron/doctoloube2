"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const patients_service_1 = require("../services/patients.service");
const http_status_codes_1 = require("../utils/http-status-codes");
class PatientController {
    static async createPatient(req, res) {
        const { firstName, lastName, birthDate, doctorId } = req.body;
        try {
            const newPatient = await patients_service_1.PatientService.createPatient({
                firstName,
                lastName,
                birthDate,
                doctorId,
            });
            return res.status(http_status_codes_1.HttpStatusCodes.CREATED).json(newPatient);
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error creating patient',
            });
        }
    }
    static async getAllPatients(req, res) {
        try {
            const patients = await patients_service_1.PatientService.getAllPatients();
            return res.status(http_status_codes_1.HttpStatusCodes.OK).json(patients);
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching all patients',
            });
        }
    }
    static async getPatientById(req, res) {
        const { patientid } = req.params;
        try {
            const patient = await patients_service_1.PatientService.getPatientById(parseInt(patientid));
            if (!patient) {
                return res.status(http_status_codes_1.HttpStatusCodes.NOT_FOUND).json({
                    message: 'Patient not found',
                });
            }
            return res.status(http_status_codes_1.HttpStatusCodes.OK).json(patient);
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching patient',
            });
        }
    }
    static async getAppointments(req, res) {
        const { patientid } = req.params;
        try {
            const appointments = await patients_service_1.PatientService.getAppointments(parseInt(patientid));
            if (!appointments) {
                return res.status(http_status_codes_1.HttpStatusCodes.NOT_FOUND).json({
                    message: 'No appointments found for this patient',
                });
            }
            return res.status(http_status_codes_1.HttpStatusCodes.OK).json(appointments);
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching appointments',
            });
        }
    }
    static async getTelephones(req, res) {
        const { patientid } = req.params;
        try {
            const telephones = await patients_service_1.PatientService.getTelephones(parseInt(patientid));
            if (!telephones) {
                return res.status(http_status_codes_1.HttpStatusCodes.NOT_FOUND).json({
                    message: 'No telephones found for this patient',
                });
            }
            return res.status(http_status_codes_1.HttpStatusCodes.OK).json(telephones);
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error fetching telephones',
            });
        }
    }
    static async assignDoctor(req, res) {
        const { patientid, doctorid } = req.params;
        try {
            const updatedPatient = await patients_service_1.PatientService.assignDoctor(parseInt(patientid), parseInt(doctorid));
            return res.status(http_status_codes_1.HttpStatusCodes.OK).json(updatedPatient);
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error assigning doctor to patient',
            });
        }
    }
    static async updatePatient(req, res) {
        const { patientid } = req.params;
        const data = req.body;
        try {
            const updatedPatient = await patients_service_1.PatientService.updatePatient(parseInt(patientid), data);
            return res.status(http_status_codes_1.HttpStatusCodes.OK).json(updatedPatient);
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error updating patient data',
            });
        }
    }
    static async deletePatient(req, res) {
        const { patientid } = req.params;
        try {
            await patients_service_1.PatientService.deletePatient(parseInt(patientid));
            return res.status(http_status_codes_1.HttpStatusCodes.NO_CONTENT).send();
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error deleting patient',
            });
        }
    }
}
exports.PatientController = PatientController;
