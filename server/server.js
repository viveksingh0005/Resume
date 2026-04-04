require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

const startServer = async () => {
    try {
        await connectToDB();
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is running on port ${process.env.PORT || 3000}`)
        })
    }
    catch(err) {
        console.log(err);
    }
}

startServer();