const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    recipient:{
        type:String,
        required:true
    },

    subject:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    sentTo:{
        type:String,
        enum:["all","single"],
        required:true
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);