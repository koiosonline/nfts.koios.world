import mongoose from "mongoose";

export const connectMongo = async () =>
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority`
  );
