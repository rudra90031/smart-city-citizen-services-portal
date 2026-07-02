const Notification = require("../models/Notification");

const getUserNotifications = async(req,res)=>{

    try{

        const notifications = await Notification.find({

            userId:req.params.userId

        })

        .sort({createdAt:-1});

        res.json(notifications);

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

};

const markAsRead = async(req,res)=>{

    try{

        await Notification.findByIdAndUpdate(

            req.params.id,

            {

                isRead:true

            }

        );

        res.json({

            message:"Notification marked as read"

        });

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

};
module.exports={

    getUserNotifications,

    markAsRead

};