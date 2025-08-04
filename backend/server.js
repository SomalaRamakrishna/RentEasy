const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const mongoose= require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config({ quiet: true });


const MONGODB_URI = process.env.MONGODB_URI ;
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);    
});


//routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const ownerRoutes=require('./routes/ownerRoutes');
app.use('/api/owner',ownerRoutes);

const userRoutes=require('./routes/userRoutes');
app.use('/api/user',userRoutes);

const paymentRoutes=require('./routes/paymentRoutes');
app.use('/api/payment',paymentRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

app.listen(port,()=>{
console.log(`Server is running on port ${port}`);
})
