import Router from "express";
import { getAllDeal, getDealById } from "../../controllers/deal/deal.controllers.js";

const dealRouter = Router();

dealRouter.get("/all",getAllDeal)
dealRouter.get("/:id",getDealById)
export default dealRouter;