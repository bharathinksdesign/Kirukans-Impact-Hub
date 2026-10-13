import { Router, type IRouter } from "express";
import healthRouter from "./health";
import volunteerEnquiriesRouter from './volunteer-enquiries';

const router: IRouter = Router();

router.use(healthRouter);
router.use(volunteerEnquiriesRouter);

export default router;
