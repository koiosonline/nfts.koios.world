import mongoose from "mongoose";

export const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    mongoose.connections[0];
    return;
  }
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority`
  );
};
