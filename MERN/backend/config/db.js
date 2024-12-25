import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
   // tlsAllowInvalidCertificates: true // Usar la variable de entorno
    if (!uri) {
      throw new Error('MONGO_URI no está definida en el archivo .env');
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
