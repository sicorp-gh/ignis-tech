const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, '../db');
const UPLOADS_PATH = path.join(__dirname, '../uploads');

// Ensure system directories exist
const requiredDirs = [
    DB_PATH,
    UPLOADS_PATH,
    path.join(UPLOADS_PATH, 'services'),
    path.join(UPLOADS_PATH, 'team'),
    path.join(UPLOADS_PATH, 'projects'),
    path.join(UPLOADS_PATH, 'partners'),
    path.join(UPLOADS_PATH, 'testimonials'),
    path.join(UPLOADS_PATH, 'staff'),
    path.join(UPLOADS_PATH, 'general')
];

const fsSync = require('fs');
requiredDirs.forEach(dir => {
    if (!fsSync.existsSync(dir)) {
        fsSync.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

// Middleware
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// Enable CORS for static assets explicitly
app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
}, express.static(UPLOADS_PATH));

app.get('/', (req, res) => {
    res.send('IGNIS API Server Running');
});

// Helpers
async function getJsonData(filename) {
    try {
        const filePath = path.join(DB_PATH, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return null;
    }
}

async function saveJsonData(filename, data) {
    try {
        const filePath = path.join(DB_PATH, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 4));
        return true;
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        return false;
    }
}

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: 'error', message: 'Forbidden' });
        req.user = user;
        next();
    });
};

// --- ROUTES ---

// 1. Auth Routes
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const adminData = await getJsonData('admin.json');

    if (adminData && username === adminData.username && await bcrypt.compare(password, adminData.password)) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            status: 'success',
            message: 'Login successful',
            token,
            user: { username }
        });
    } else {
        // Fallback for initial setup if admin.json is somehow missing or not hashed correctly
        // (The PHP script uses password_hash which is compatible with bcrypt)
        res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
});

app.get('/api/auth/check', authenticateToken, (req, res) => {
    res.json({ status: 'success', user: req.user });
});

// 2. Content Routes (Public & Protected)
app.get('/api/content', async (req, res) => {
    const content = await getJsonData('content.json');
    const settings = await getJsonData('settings.json');
    res.json({
        ...content,
        settings
    });
});

app.get('/api/cms/data', authenticateToken, async (req, res) => {
    const { type } = req.query;
    if (!['settings', 'content', 'messages'].includes(type)) {
        return res.status(400).json({ status: 'error', message: 'Invalid type' });
    }
    const data = await getJsonData(`${type}.json`);
    res.json({ status: 'success', data });
});

app.post('/api/cms/data', authenticateToken, async (req, res) => {
    const { type } = req.query;
    if (!['settings', 'content', 'messages'].includes(type)) {
        return res.status(400).json({ status: 'error', message: 'Invalid type' });
    }
    const result = await saveJsonData(`${type}.json`, req.body);
    if (result) {
        res.json({ status: 'success', message: 'Data saved successfully' });
    } else {
        res.status(500).json({ status: 'error', message: 'Failed to save data' });
    }
});

app.delete('/api/cms/data', authenticateToken, async (req, res) => {
    const { type, id, category } = req.query;
    let data = await getJsonData(`${type}.json`);

    if (type === 'content' && category) {
        if (data[category]) {
            // Find item to delete its file
            const itemToDelete = data[category].find(item => item.id == id);
            if (itemToDelete && itemToDelete.image) {
                const filePath = path.join(__dirname, '..', itemToDelete.image);
                try {
                    if (fsSync.existsSync(filePath)) {
                        fsSync.unlinkSync(filePath);
                        console.log(`Deleted file: ${filePath}`);
                    }
                } catch (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                }
            }
            data[category] = data[category].filter(item => item.id != id);
        }
    } else if (type === 'messages') {
        data = data.filter(item => item.id != id);
    } else {
        return res.status(400).json({ status: 'error', message: 'Invalid delete parameters' });
    }

    if (await saveJsonData(`${type}.json`, data)) {
        res.json({ status: 'success', message: 'Item deleted successfully' });
    } else {
        res.status(500).json({ status: 'error', message: 'Failed to delete item' });
    }
});

// 3. Message Route (Public)
app.post('/api/messages/send', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ status: 'error', message: 'Incomplete data' });
    }

    const newMessage = {
        id: Date.now(),
        name,
        email,
        subject: subject || 'No Subject',
        message,
        created_at: new Date().toISOString(),
        status: 'unread'
    };

    const messages = await getJsonData('messages.json') || [];
    messages.push(newMessage);
    
    if (await saveJsonData('messages.json', messages)) {
        res.json({ status: 'success', message: 'Message sent successfully' });
    } else {
        res.status(500).json({ status: 'error', message: 'Failed to send message' });
    }
});

app.post('/api/newsletter/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ status: 'error', message: 'Email is required' });

    const subscription = {
        id: Date.now(),
        email,
        subscribed_at: new Date().toISOString()
    };

    const subscriptions = await getJsonData('newsletter.json') || [];
    subscriptions.push(subscription);

    if (await saveJsonData('newsletter.json', subscriptions)) {
        res.json({ status: 'success', message: 'Subscribed successfully' });
    } else {
        res.status(500).json({ status: 'error', message: 'Subscription failed' });
    }
});

// 4. Upload Route (Protected)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Upload request body:', req.body);
        const type = req.body.type || 'general';
        const dest = path.join(UPLOADS_PATH, type);
        
        console.log(`Targeting upload directory: ${dest}`);
        
        try {
            if (!fsSync.existsSync(dest)) {
                fsSync.mkdirSync(dest, { recursive: true });
                console.log(`Created directory on-demand: ${dest}`);
            }
            cb(null, dest);
        } catch (err) {
            console.error('Directory creation error:', err);
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        const cleanName = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
        const filename = Date.now() + '_' + cleanName;
        console.log(`Generated filename: ${filename}`);
        cb(null, filename);
    }
});

const upload = multer({ storage });

app.post('/api/cms/upload', authenticateToken, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }
    const type = req.body.type || 'general';
    const relativePath = `uploads/${type}/${req.file.filename}`;
    res.json({
        status: 'success',
        message: 'File uploaded successfully',
        url: relativePath
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'error', 
        message: err.message || 'Something went wrong on the server' 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`DB Path: ${DB_PATH}`);
    console.log(`Uploads Path: ${UPLOADS_PATH}`);
});
