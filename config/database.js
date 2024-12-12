import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  //strictquery: only fields specified in schema will be saved to DB
  mongoose.set("strictQuery", true);

  //if DB is already connected, then don't connect again
  if (connected) {
    console.log("Mongo DB is connected");
    return;
  }

  //connect to mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
