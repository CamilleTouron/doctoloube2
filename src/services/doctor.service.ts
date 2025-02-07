import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DoctorService {
    static async createDoctor(data: {
        firstName: string;
        lastName: string;
        job: string;
    }) {
        try {
            return await prisma.doctor.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    job: data.job,
                },
            });
        } catch (error) {
            throw new Error(`Error creating doctor ${error}`);
        }
    }

    static async getAllDoctors() {
        try {
            return await prisma.doctor.findMany();
        } catch (error) {
            throw new Error(`Error fetching doctors ${error}`);
        }
    }

    static async getDoctorById(id: number) {
        try {
            return await prisma.doctor.findUnique({
                where: { id },
            });
        } catch (error) {
            throw new Error(`Error fetching doctor by ID ${error}`);
        }
    }

    static async updateDoctor(id: number, data: any) {
        try {
            return await prisma.doctor.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error(`Error updating doctor ${error}`);
        }
    }

    static async deleteDoctor(id: number) {
        try {
            await prisma.doctor.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            throw new Error(`Error deleting doctor ${error}`);
        }
    }
}
