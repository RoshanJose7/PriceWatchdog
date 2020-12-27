import mongoose from "mongoose";

const URI =
  "mongodb+srv://dbUser:dbUserPassword@userdata.dmwm7.mongodb.net/dbUser?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log(err));

export const db = mongoose.connection;
