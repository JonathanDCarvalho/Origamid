import { Router } from "express";
import gmaController from "usecases/gma/gma.controller";

const gmaRouter = Router();

gmaRouter.get("/invoicing", gmaController.handleInvoicing);

export { gmaRouter };
