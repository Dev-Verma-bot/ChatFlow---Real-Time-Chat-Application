const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },    
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false 
    },
    message: {
        type: String,
        required: true
    },
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Conversation_room",
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);