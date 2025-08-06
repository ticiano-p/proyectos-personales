import mongoose, { Types } from 'mongoose';

const courseSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', default: null }
});


export const CoursesModel = mongoose.model('Course', courseSchema)