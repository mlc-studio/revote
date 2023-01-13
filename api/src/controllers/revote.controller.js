import ReVote from '../models/revote.model.js';
import Vote from '../models/vote.model.js';

export default class ReVoteController {
    static async get(req, res) {
        const { filter, page } = req.query;
        const limit = 10;
        const skip = ((page || 1) - 1) * limit;

        if (!filter) return res.status(400).json({ message: 'Please enter all fields' });

        var revotes = [];

        try {
            switch (filter) {
                case 'top-weekly':
                    // Populate user data but don't return the encryptedPassword
                    revotes = await ReVote.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user', '-encryptedPassword');
                    break;
                case 'newest':
                    revotes = await ReVote.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
                    break;
                default:
                    revotes = await ReVote.find();
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }

        return res.status(200).json({ revotes });
    }

    static async create(req, res) {
        const { title, description } = req.body;
        
        if (!title || !description) return res.status(400).json({ message: 'Please enter all fields' });

        if (title.length < 3) return res.status(400).json({ message: 'Title must be at least 3 characters' });
        if (title.length > 100) return res.status(400).json({ message: 'Title must be at most 100 characters' });
        if (description.length < 10) return res.status(400).json({ message: 'Description must be at least 10 characters' });
        if (description.length > 500) return res.status(400).json({ message: 'Description must be at most 500 characters' });

        try {
            const newReVote = new ReVote({ title, description, user: req.userId });

            await newReVote.save();

            return res.status(201).json({ message: 'ReVote created successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }

    static async vote(req, res) {
        const { revoteId, upOrDown } = req.body;
        if (!revoteId || upOrDown === undefined) return res.status(400).json({ message: 'Please enter all fields' });

        try {
            const revote = await ReVote.findById(revoteId);
            if (!revote) return res.status(404).json({ message: 'ReVote not found' });

            const vote = await Vote.findOne({ revote: revoteId, user: req.userId });

            if (vote) await vote.remove();
            
            const newVote = new Vote({ revote: revoteId, user: req.userId, upOrDown });
            await newVote.save();

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }   

        return res.status(201).json({ message: 'Vote created successfully' });
    }

    static async countVotes(req, res) {
        const { revoteId } = req.query;
        if (!revoteId) return res.status(400).json({ message: 'Please enter all fields' });

        try {
            const revote = await ReVote.findById(revoteId);
            if (!revote) return res.status(404).json({ message: 'ReVote not found' });

            const votes = await Vote.find({ revote: revoteId });

            const upVotes = votes.filter(vote => vote.upOrDown === true).length;
            const downVotes = votes.filter(vote => vote.upOrDown === false).length;

            const totalVotes = upVotes - downVotes;

            return res.status(200).json({ votes: totalVotes });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const revote = await ReVote.findById(id);
            if (!revote) return res.status(404).json({ message: 'ReVote not found' });

            if (revote.user.toString() !== req.userId) return res.status(401).json({ message: 'Not authorized' });

            await revote.remove();

            return res.status(200).json({ message: 'ReVote deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
                