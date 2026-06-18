const mongoose=require('mongoose');
require('dotenv').config();

exports.dbconnect=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB connection successfull");
    })
    .catch((err)=>{
        console.log("DB connection Failed");
        console.error(err);
        process.exit(1);
       
    })

}

