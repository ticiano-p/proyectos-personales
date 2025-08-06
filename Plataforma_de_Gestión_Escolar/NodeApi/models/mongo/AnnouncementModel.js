import mongoose, { Types } from 'mongoose';

const announcementSchema = new mongoose.Schema({
    school_id: { type: mongoose.Schema.Types.ObjectId, ref: "School" , required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    message: { type: String, required: true },
    create_at: { type: Date, default: Date.now }
})

export const AnnouncementModel = mongoose.model( 'announcement', announcementSchema )