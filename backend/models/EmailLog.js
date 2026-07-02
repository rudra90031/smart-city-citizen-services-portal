const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    recipient:{
        type:String,
        required:true
    },

    email:{
        type:String,
        default:""
    },

    subject:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "EmailLog",
    notificationSchema
);