const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const { expressjwt: jwtCheck } = require('express-jwt');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const letterRoutes = require('./routes/letterRoutes');
const driveRoutes = require('./routes/driveRoutes');

const app = express();

// Validate environment configuration
const requiredEnvVars = [
    'MONGO_URI',
    'FRONTEND_URL',
    'AUTH0_JWKS_URI',
    'AUTH0_AUDIENCE',
    'AUTH0_ISSUER'
];

requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`Error: ${varName} is not defined in .env file`);
        process.exit(1);
    }
});

// Enhanced CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Google-Token'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// JWT Authentication Middleware
const checkJwt = jwtCheck({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_JWKS_URI
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256']
});

// MongoDB Connection with Enhanced Logging
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection fatal error:', err);
        process.exit(1);
    }
};

connectToMongoDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/letters', checkJwt, letterRoutes);
app.use('/api/drive', checkJwt, driveRoutes);

app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    switch (err.name) {
        case 'UnauthorizedError':
            return res.status(401).json({
                message: 'Invalid or missing authentication token',
                error: 'Unauthorized'
            });

        case 'ValidationError':
            return res.status(400).json({
                message: 'Validation failed',
                errors: err.errors
            });

        case 'MongoError':
            return res.status(500).json({
                message: 'Database operation failed',
                error: err.message
            });

        default:
            res.status(err.status || 500).json({
                message: err.message || 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
    }
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.path
    });
});

// Server Configuration
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on ${HOST}:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// if (process.env.NODE_ENV = "production") {
//     app.use(express.static("client/build"));
// }

app.get('/', (req, res) => {
    res.send({
        activeStatus: true,
        error: false,
    })
})

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});

// Capture unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;