const Letter = require('../models/Letter');
const getLetters = async (req, res) => {
    try {
        const userId = req.auth.payload.sub;
        const letters = await Letter.find({ userId });
        res.json(letters);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const createLetter = async (req, res) => {
    const { title, content } = req.body;
    try {
        const userId = req.auth.payload.sub;
        const letter = new Letter({
            userId,
            title,
            content,
        });
        await letter.save();
        res.status(201).json(letter);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateLetter = async (req, res) => {
    const { title, content } = req.body;
    try {
        const userId = req.auth.payload.sub;
        const letter = await Letter.findById(req.params.id);
        if (!letter) {
            return res.status(404).json({ message: 'Letter not found' });
        }
        if (letter.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        letter.title = title;
        letter.content = content;
        letter.updatedAt = Date.now();
        await letter.save();
        res.json(letter);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { getLetters, createLetter, updateLetter };