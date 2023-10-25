import mongoose from 'mongoose';

export const mongodbConnection = async (uri) => {
  try {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log('App connected to database');
  } catch (e) {
    console.log('Cannot connection with data base');
    throw new Error(e)
  }
};