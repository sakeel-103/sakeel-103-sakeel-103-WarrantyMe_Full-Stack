const Letter = require('../models/Letter');
const { google } = require('googleapis');
const saveToDrive = async (req, res) => {
    try {
        const userId = req.auth.payload.sub;
        const letter = await Letter.findById(req.params.id);
        if (!letter) {
            return res.status(404).json({ message: 'Letter not found' });
        }
        if (letter.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const googleAccessToken = req.headers['x-google-access-token'];
        if (!googleAccessToken) {
            return res.status(401).json({ message: 'Google access token missing' });
        }
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: googleAccessToken });

        const drive = google.drive({ version: 'v3', auth: oauth2Client });
        const fileMetadata = {
            name: letter.title,
            mimeType: 'application/vnd.google-apps.document',
        };
        const fileContent = {
            content: letter.content,
        };
        const response = await drive.files.create({
            resource: fileMetadata,
            media: {
                mimeType: 'text/plain',
                body: fileContent.content,
            },
            fields: 'id',
        });
        letter.driveFileId = response.data.id;
        await letter.save();

        res.json({ fileId: response.data.id });
    } catch (err) {
        res.status(500).json({ message: 'Error saving to Google Drive', error: err.message });
    }
};
const getFromDrive = async (req, res) => {
    try {
        const userId = req.auth.payload.sub;
        const letter = await Letter.findOne({ driveFileId: req.params.fileId });
        if (!letter) {
            return res.status(404).json({ message: 'Letter not found' });
        }
        if (letter.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const googleAccessToken = req.headers['x-google-access-token'];
        if (!googleAccessToken) {
            return res.status(401).json({ message: 'Google access token missing' });
        }
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: googleAccessToken });
        const drive = google.drive({ version: 'v3', auth: oauth2Client });
        const fileId = req.params.fileId;
        const fileMetadata = await drive.files.get({ fileId, fields: 'name, mimeType' });
        const response = await drive.files.export(
            {
                fileId,
                mimeType: 'text/plain',
            },
            { responseType: 'stream' }
        );

        let content = '';
        response.data.on('data', (chunk) => {
            content += chunk.toString();
        });

        response.data.on('end', () => {
            res.json({
                title: fileMetadata.data.name,
                content,
            });
        });

        response.data.on('error', (err) => {
            res.status(500).json({ message: 'Error retrieving letter from Google Drive', error: err.message });
        });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving letter from Google Drive', error: err.message });
    }
};

module.exports = { saveToDrive, getFromDrive };