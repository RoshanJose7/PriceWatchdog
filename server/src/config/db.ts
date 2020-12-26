import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/PriceTrackerUsers";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log(err));

export const db = mongoose.connection;
