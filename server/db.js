const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(
            'mongodb+srv://ali:ali110@cluster0.ravart8.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB