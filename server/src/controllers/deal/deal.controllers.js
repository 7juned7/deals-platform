import mongoose from "mongoose";
import Deal from "../../modals/deal/deal.modal.js";

export async function getAllDeal(req, res) {
  try {
    const deals = await Deal.find({ isActive: true })
      .select("title shortDescription partner accessLevel expiryDate")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: deals.length,
      deals
    });
  } catch (error) {
    console.error("Error in fetching deals", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching deals"
    });
  }
}

export async function getDealById(req, res) {
  try {
    const { id } = req.params;

    // ✅ ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid deal id"
      });
    }

    const deal = await Deal.findOne({
      _id: id,
      isActive: true
    }).lean();

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found"
      });
    }

    return res.status(200).json({
      success: true,
      deal
    });
  } catch (error) {
    console.error("Error in fetching deal", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching deal"
    });
  }
}

