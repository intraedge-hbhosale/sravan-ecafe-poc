import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const ConnectDB = async () => {
    const DB_URL = "mongodb+srv://basic-user:Test123@cluster0.tcldovs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    try {
        await mongoose.connect(DB_URL)
    } catch(error) {
        console.log(error);
    }
}

export { ConnectDB };