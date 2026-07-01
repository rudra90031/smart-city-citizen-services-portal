const Notification=require("../models/Notification");
const User=require("../models/User");
const nodemailer=require("nodemailer");

const transporter=nodemailer.createTransport({

    service:"gmail",

    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }

});

const sendNotification=async(req,res)=>{

try{

const{

recipient,
email,
subject,
message

}=req.body;


if(recipient==="all"){

const users=await User.find();

for(const user of users){

await transporter.sendMail({

from:process.env.EMAIL,

to:user.email,

subject,

text:message

});

}

await Notification.create({

recipient:"All Users",

subject,

message,

sentTo:"all"

});

}

else{

await transporter.sendMail({

from:process.env.EMAIL,

to:email,

subject,

text:message

});

await Notification.create({

recipient:email,

subject,

message,

sentTo:"single"

});

}

res.json({

message:"Notification Sent"

});

}

catch(err){

console.log(err);

res.status(500).json({

message:"Server Error"

});

}

};

const getNotifications=async(req,res)=>{

const data=await Notification
.find()
.sort({createdAt:-1});

res.json(data);

};

module.exports={

sendNotification,

getNotifications

};