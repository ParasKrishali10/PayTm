const express=require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router=express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession()
    session.startTransaction();
    const {amount,to}=req.body;
    const account=await Account.findOne({
        userId:req.userId
    })
    if(account.balance<amount)
    {   
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        })
    }
    const toAccount=Account.findOne({
        userId:to
    })
    if(!toAccount)
    {
        await session.abortTransaction();
        res.status(400).json({
            message:"Invalid Account"
        })
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    })
    await Account.updateOne({
        userId:to
    },{
        $inc:{
            balance:amount
        }
    })
    await session.commitTransaction()
    res.json({
        message:"Transfer Succesful"
    })
})

module.exports=router