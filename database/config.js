import mongoose from 'mongoose';

export const mongodbConnection = async () => {
  mongoose
    .connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('App connected to database');
    })
    .catch((error) => {
      console.error(error);
    });
};