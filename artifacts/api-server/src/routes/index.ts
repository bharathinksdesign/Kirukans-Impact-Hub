import { Router, type IRouter } from "express";
import healthRouter from "./health";
import volunteerEnquiriesRouter from './volunteer-enquiries';
import donationsRouter from './donations';

const router: IRouter = Router();

router.use(healthRouter);
router.use(volunteerEnquiriesRouter);
router.use(donationsRouter);

export default router;
