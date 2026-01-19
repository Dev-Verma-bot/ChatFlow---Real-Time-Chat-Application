const User = require("../Modals/User");
const Conversation_room= require("../Modals/Conversatation_room");
const Search_user= async(req,res)=>{
    try{
        const search= req.query.search||'';
        const curr_user_id= req.user.id;

        const users=await User.find({
            $and:[
                {
                    $or:[
                        {user_name:{$regex:'.*'+search+'.*', $options:'i'}},
                        {first_name:{$regex:'.*'+search+'.*', $options:'i'}},
                        {last_name:{$regex:'.*'+search+'.*', $options:'i'}},
                    ]
                }
                ,
                {_id:{$ne:curr_user_id}}
            ]
        }).select("-password").select("-email");
        return res.status(200).json({
            success:true,
            data:users,    
            message:"Search Users fetch successfully !"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            data:error,
            message:"Unable to search users !",
        })
    }
}

// first select the room in which you are enrolled then fetch all other participants and return them ! 
const get_chatters = async (req, res) => {
    try {
        const currentUserID = req.user.id;

        const enrolled_conversation_rooms = await Conversation_room.find({
            participants: currentUserID
        }).sort({
            updatedAt: -1
        });

        if (!enrolled_conversation_rooms || enrolled_conversation_rooms.length === 0) {
            return res.status(200).json([]);
        }

        const otherParticipantsIDS = enrolled_conversation_rooms.reduce((ids, conversation) => {
            const otherParticipants = conversation.participants.filter(
                id => id.toString() !== currentUserID.toString()
            );
            return [...ids, ...otherParticipants];
        }, []);

        const userList = await User.find({
            _id: { $in: otherParticipantsIDS }
        }).select("-password").select("-email");

        const users = otherParticipantsIDS.map(id => 
            userList.find(u => u._id.toString() === id.toString())
        );
        return res.status(200).json({
            success: true,
            data: users,
            message: "Enrolled conversation participants fetched successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching enrolled conversation rooms",
            error: error.message
        });
    }
};
module.exports= {Search_user,get_chatters};