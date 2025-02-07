"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PatientService {
    static async createPatient(data) {
        try {
            return await prisma.patient.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDate: data.birthDate,
                    doctor: {
                        connect: { id: data.doctorId },
                    },
                },
            });
        }
        catch (error) {
            throw new Error(`Error creating patient ${error}`);
        }
    }
    static async getAllPatients() {
        try {
            return await prisma.patient.findMany();
        }
        catch (error) {
            throw new Error('Error fetching patients');
        }
    }
    static async getPatientById(id) {
        try {
            return await prisma.patient.findUnique({
                where: { id },
            });
        }
        catch (error) {
            throw new Error('Error fetching patient by ID');
        }
    }
    static async getAppointments(patientId) {
        try {
            const patient = await prisma.patient.findUnique({
                where: { id: patientId },
                include: {
                    appointments: true,
                },
            });
            if (!patient) {
                return null;
            }
            return patient.appointments;
        }
        catch (error) {
            throw new Error('Error fetching appointments for patient');
        }
    }
    static async getTelephones(patientId) {
        try {
            const patient = await prisma.patient.findUnique({
                where: { id: patientId },
                include: {
                    telephones: true,
                },
            });
            if (!patient) {
                return null;
            }
            return patient.telephones;
        }
        catch (error) {
            throw new Error('Error fetching telephones for patient');
        }
    }
    static async assignDoctor(patientId, doctorId) {
        try {
            return await prisma.patient.update({
                where: { id: patientId },
                data: {
                    doctor: {
                        connect: { id: doctorId },
                    },
                },
            });
        }
        catch (error) {
            throw new Error('Error assigning doctor to patient');
        }
    }
    static async updatePatient(id, data) {
        try {
            return await prisma.patient.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            throw new Error('Error updating patient');
        }
    }
    static async deletePatient(id) {
        try {
            await prisma.patient.delete({
                where: { id },
            });
            return true;
        }
        catch (error) {
            throw new Error('Error deleting patient');
        }
    }
}
exports.PatientService = PatientService;
