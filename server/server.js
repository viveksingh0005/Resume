require("dotenv").config()
const app=require("./src/app")
const connectToDB = require("./src/config/database")
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

const startServer=async()=>{
    try{
        await connectToDB();
        app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

    }
    catch(err){
        console.log(err);
    }
}

startServer();
