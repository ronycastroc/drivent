import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createPayment, getPaymentByTicketId } from "@/controllers";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", createPayment);

export { paymentRouter };
