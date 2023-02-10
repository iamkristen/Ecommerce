const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const colors = require("colors");
const app = express();
const parser = require('body-parser');
const userRoutes = require('./routes/user_routes');
const productRoutes = require('./routes/product_routes');
const categoryRoutes = require('./routes/category_routes');
const fileRoutes = require('./routes/file_routes');
const orderRoutes = require('./routes/order_routes');

dotenv.config();

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use('/api/user',userRoutes);
app.use('/api/product',productRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/file',fileRoutes);
app.use('/api/order',orderRoutes);
app.use(express.static("uploads"));

app.get("/",(req,res)=>{
    res.send("Hello world");
})


mongoose.set('strictQuery',true)
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('Database connect'.yellow)).catch((err)=>console.log(err.yellow))



app.listen(process.env.PORT,()=>{
    console.log(`Server running on Port: ${process.env.PORT}`.yellow);
})