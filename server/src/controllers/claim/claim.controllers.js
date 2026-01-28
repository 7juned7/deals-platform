import Claim from "../../modals/claim/claim.modal.js";
import Deal from "../../modals/deal/deal.modal.js";

export async function claimDeal(req,res){
    try{
const userId = req.user.id;
const {id} = req.params;
const deal = await Deal.findById(id);
if(!deal){
    return res.status(404).json({message:"deal not found"});

}
console.log(req.user)
if(deal.accessLevel==="locked" && !req.user.isVerified){
return res.status(404).json({message:"verification is required to claim this deal"});
}
const claim = await Claim.create({
user:userId,
deal:id
});
return res.status(201).json({
    message:"deal claimed succesfully",
    claim
})
    }catch(error){
return res.status(500).json({messaage:"error in claiming deal"});
    }
}

export async function getMyClaims(req,res){
    try{
     const userId = req.user.id;
     const claims = await Claim.find({user:userId})
     .populate('deal')
     .lean();
     return res.status(200).json(claims)
    }catch(error){
return res.status(500).json({messaage:"error in fetching claims"})
    }
}