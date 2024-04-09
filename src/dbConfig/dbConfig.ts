import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(String(process.env.DATABSE_URI));

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb Connected....");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDB Connection ERROR, please make sure db is connected" + error
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Something Went Wrong In Connecting To Db");
    console.log(error);
  }
}
