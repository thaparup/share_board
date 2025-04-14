import { app } from "./app";
import connectDb from "./db";

connectDb()
  .then((result) => {
    if (result === true) {
      app.listen(process.env.PORT, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error(" db connection failed !!! ", err);
    process.exit(1);
  });
