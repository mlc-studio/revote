import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
    revote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Revote',
        required: true,
    },
    upOrDown: {
        type: Boolean,
        required: true,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

const Vote = mongoose.model('Vote', VoteSchema);
    
export default Vote;