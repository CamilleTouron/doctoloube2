import {PrismaClient} from '@prisma/client';
import e from "express";

const prisma = new PrismaClient();

export class PatientService {
    static async createPatient(data: {
        firstName: string;
        lastName: string;
        birthDate: Date;
        doctorId: number;
    }) {
        try {
            return await prisma.patient.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDate: data.birthDate,
                    doctor: {
                        connect: {id: data.doctorId},
                    },
                },
            });
        } catch (error) {
            throw new Error(`Error creating patient ${error}`);
        }
    }

    static async getAllPatients() {
        try {
            return await prisma.patient.findMany();
        } catch (error) {
            throw new Error(`Error fetching patients ${error}`);
        }
    }

    static async getPatientById(id: number) {
        try {
            return await prisma.patient.findUnique({
                where: { id },
            });
        } catch (error) {
            throw new Error(`Error fetching patient by ID ${error}`);
        }
    }

    static async getAppointments(patientId: number) {
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
        } catch (error) {
            throw new Error(`Error fetching appointments for patient ${error}`);
        }
    }

    static async getTelephones(patientId: number) {
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
        } catch (error) {
            throw new Error(`Error fetching telephones for patient ${error}`);
        }
    }

    static async assignDoctor(patientId: number, doctorId: number) {
        try {
            return await prisma.patient.update({
                where: {id: patientId},
                data: {
                    doctor: {
                        connect: {id: doctorId},
                    },
                },
            });
        } catch (error) {
            throw new Error(`Error assigning doctor to patient ${error}`);
        }
    }

    static async updatePatient(id: number, data: any) {
        try {
            return await prisma.patient.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error(`Error updating patient ${error}`);
        }
    }

    static async deletePatient(id: number) {
        try {
            await prisma.patient.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            throw new Error(`Error deleting patient ${error}`);
        }
    }
}
