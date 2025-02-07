import express, { Request, Response, NextFunction } from 'express';
import patientRoutes from './routes/patients.route';
import doctorsRoutes from "./routes/doctors.route";

const app = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('Healthy');
});

app.use(patientRoutes);
app.use(doctorsRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
