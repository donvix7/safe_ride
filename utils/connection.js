import mongoose from "mongoose";


const connectToDb = async () => {

   // mongoose.set("StrictQuery", true);
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("connected to database")

    }
    catch(error) {
        console.log(error)
    }
}
export default connectToDb