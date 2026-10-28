import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import reelRouter from './routes/reelRoutes.js';
import uploadRouter from './routes/uploadRouter.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect services
connectDB();
connectCloudinary();

// Allowed frontend origins
const allowedOrigins = [
    'https://e-commerce-website-umi7.vercel.app',
    'https://e-commerce-website-royx.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
};
// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/reels', reelRouter);
app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
});
