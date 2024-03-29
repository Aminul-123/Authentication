import mongoose from "mongoose";
export const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected..', () => {
            console.log("MongoDB connected successfully...");
        })
        connection.on('error' ,()=> {
            console.log('Mongodb connection error');
            process.exit();
        })
    } catch(error) {
        console.log(error);
    }
}