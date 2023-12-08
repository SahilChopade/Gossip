require('dotenv').config();
const express = require('express');
const cors  = require('cors');
const {connectDB} = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth/",userRoutes);


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
})