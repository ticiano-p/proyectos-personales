import mongoose, { Types } from "mongoose";

const schoolSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    name:  { type: String, required: true },
    CUE: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    phones: { type: [String], required: true }, 
    Emails: { type: [String], required: true, unique: true },  
    creation_date: { type: Date, default: Date.now },  
    level: { type: String, required: true },  
    type: { type: String, required: true }      
  }, {
    versionKey: false 
  })

export const SchoolModel = mongoose.model('School', schoolSchema)
