import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { claimDeal, getMyClaims } from "../../controllers/claim/claim.controllers.js";

const claimRouter = Router();

// claim a deal (protected)
claimRouter.post("/:id", authMiddleware, claimDeal);

// get logged-in user's claims (dashboard)
claimRouter.get("/me", authMiddleware, getMyClaims);

export default claimRouter;