const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const router = express.Router();
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const authRoutes = require("./routes/Auth");
const todoRoutes = require("./routes/Todos");
dotenv.config();

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB");
        
    } catch (error) {
        console.log(error);
        
    }
    
}

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`Server is listening on port ${process.env.PORT}`);
    
})