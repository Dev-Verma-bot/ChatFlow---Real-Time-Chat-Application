const Conversation_room = require("../Modals/Conversatation_room");
const Message = require("../Modals/Message");
const { getRecieverSocketID, io } = require("../Socket/Socket");

const send_message = async (req, res) => {
    try {
        const { message } = req.body; 
        const sender_id = req.user.id;
        const { id: receiver_id } = req.params; 

        if (!message || !receiver_id) {
            return res.status(400).json({
                success: false,
                message: "Message content and Receiver ID are required."
            });
        }

        // The $all operator checks if the array contains both IDs regardless of order
        let chat_room = await Conversation_room.findOne({
            participants: { $all: [sender_id, receiver_id] } 
        });

        if (!chat_room) {
            chat_room = await Conversation_room.create({
                participants: [sender_id, receiver_id]
            });
        }

        // 4. Create the New Message
        const new_message = await Message.create({
            sender_id,
            receiver_id,
            conversation_id: chat_room._id,
            message
        });

        if (new_message) {
            chat_room.messages.push(new_message._id);
        }
        // socket io function 
        const recieverSocket_id= getRecieverSocketID(receiver_id);
        console.log('reciever socket id here -> ',recieverSocket_id);
        if(recieverSocket_id){
            io.to(recieverSocket_id).emit('newMessage',new_message);
        }

         await chat_room.save();

       return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: new_message
        });

    } catch (error) {
        console.error("Error in send_message:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const recieve_messages = async (req, res) => {
    try {
        const { id: receiver_id } = req.params; 
        const sender_id= req.user.id

        console.log(sender_id);
        if (!receiver_id) {
            return res.status(400).json({
                success: false,
                message: "Receiver ID is required to fetch messages."
            });
        }

        const chat = await Conversation_room.findOne({
            participants: { $all: [sender_id, receiver_id] }
        }).populate({
            path: "messages",
        });

        if (!chat) {
            return res.status(200).json({
                success: true,
                message: "No conversation found between these users.",
                messages: [] 
            });
        }

        return res.status(200).json({
            success: true,
            messages: chat.messages
        });

    } catch (error) {
        console.error("Error in recv_messages:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while fetching messages.",
            error: error.message
        });
    }
};

module.exports ={ send_message,recieve_messages}