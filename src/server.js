import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config();

try {
  await connectDB();

  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
  });
} catch (err) {
  console.log('MongoDB connection failed:', err.message);
}
