import { Router } from 'express';
import { bookAppointment } from '../controllers/appointment.controller.js';
const router = Router();

router.post('/book', bookAppointment);

export default router;
