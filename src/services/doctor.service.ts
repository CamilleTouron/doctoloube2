import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'doctoloube';

export class DoctorService {
    static async createDoctor(data: {
        firstName: string;
        lastName: string;
        job: string;
        email: string;
        password: string;
    }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return prisma.doctor.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                job: data.job,
                email: data.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                job: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    static async getAllDoctors() {
        return prisma.doctor.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                job: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    static async getDoctorById(id: number) {
        return prisma.doctor.findUnique({
            where: {id},
            select: {
                id: true,
                firstName: true,
                lastName: true,
                job: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    static async updateDoctor(id: number, data: any) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        data.updatedAt = new Date();

        return prisma.doctor.update({
            where: { id },
            data,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                job: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }


    static async deleteDoctor(id: number) {
        await prisma.doctor.delete({
            where: { id },
        });
    }

    static async login(email: string, password: string) {
        const doctor = await prisma.doctor.findUnique({
            where: { email } as { email: string },
        });

        if (!doctor) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, doctor.password);

        if (!isPasswordValid) {
            return null;
        }

        const token = jwt.sign(
            { id: doctor.id, email: doctor.email },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return { token };
    }

    static async verifyToken(token: string) {
        try {
            token = token.split(' ')[1];
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
