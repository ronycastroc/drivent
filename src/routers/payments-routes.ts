import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId } from "@/controllers";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId);

export { paymentRouter };
