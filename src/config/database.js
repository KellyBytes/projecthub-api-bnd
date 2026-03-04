import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  if (connected) {
    console.log('MongoDB is connected');
    return;
  }

  try {
    // const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    // console.log(`MongoDB is connected. ${connectionInstance.connection.host}`);
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB is connected');
  } catch (err) {
    console.log('MongoDB connection failed:', err.message);
  }
};

export default connectDB;
