import mongoose, { Types } from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', default: null },
    concept: { type: String, required: true },                                  
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    issuedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
    paidAt: { type: Date },
    paymentMethod: { type: String, enum: ['cash', 'transfer', 'card'], default: null },
    paymentType: { type: String, enum: ['create_school'], required: true }
})

export const PaymentModel = mongoose.model( 'Payment', PaymentSchema )