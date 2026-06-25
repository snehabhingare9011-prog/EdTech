const express=require('express');
const app=express();

const userRoutes=require('./routes/User');
const profileRoutes=require('./routes/Profile');
const paymentRoutes=require('./routes/Payment');
const courseRoutes=require('./routes/Course');
const {dbconnect}=require('./config/database');
const cors=require("cors");//TODO:Search About CORS
const {cloudinaryConnect}=require('./config/cloudinary');
const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');
require('./jobs/deleteAccounts');


require('dotenv').config();
const PORT=process.env.PORT || 5000;

//database connect
dbconnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:__dirname+'/tmp'

}));
app.use(  // TODO: Search About it 
    cors({
        origin:"http:/localhost:3000",
        credentials:true
    })
);

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

//default route
app.get('/',(req,res)=>{
    res.send("This is my home page");

    return res.json({
        success:true,
        message:"Your server is up and running.........."
        
    })

});

//server listen
app.listen(PORT,()=>{
    console.log(`server listen on PORT ${PORT}`)
});



