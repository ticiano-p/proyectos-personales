import mongoose, { Types } from 'mongoose';

const AnnouncementCourseSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" , required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
    create_at: { type: Date, default: Date.now }
})

export const AnnouncementCourseModel = mongoose.model( 'announcementCourse', AnnouncementCourseSchema )