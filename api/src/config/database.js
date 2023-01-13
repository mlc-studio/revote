import mongoose from "mongoose";

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch((error) => {
    console.log('❌ Error connecting to MongoDB');
    console.log(error);
});