import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to the databse");
    } catch (err) {
        console.log(err);
    }
}

export default connectDB