"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_controller_1 = require("../controllers/patients.controller");
const router = (0, express_1.Router)();
router.post('/api/v1/patients', async (req, res) => {
    await patients_controller_1.PatientController.createPatient(req, res);
});
router.get('/api/v1/patients', async (req, res) => {
    await patients_controller_1.PatientController.getAllPatients(req, res);
});
router.get('/api/v1/patients/:patientid', async (req, res) => {
    await patients_controller_1.PatientController.getPatientById(req, res);
});
router.get('/api/v1/patients/:patientid/appointments', async (req, res) => {
    await patients_controller_1.PatientController.getAppointments(req, res);
});
router.get('/api/v1/patients/:patientid/telephones', async (req, res) => {
    await patients_controller_1.PatientController.getTelephones(req, res);
});
router.put('/api/v1/patients/:patientid/doctors/:doctorid', async (req, res) => {
    await patients_controller_1.PatientController.assignDoctor(req, res);
});
router.put('/api/v1/patients/:patientid', async (req, res) => {
    await patients_controller_1.PatientController.updatePatient(req, res);
});
router.delete('/api/v1/patients/:patientid', async (req, res) => {
    await patients_controller_1.PatientController.deletePatient(req, res);
});
exports.default = router;
