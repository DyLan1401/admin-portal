import "dotenv/config";
import express from "express";
import cors from "cors";
import imageRoute from "./routes/imageRoute.js"
import userRoute from "./routes/userRoute.js"
import globalErrorHandle from "./middleware/globalErrorHandle.js"

const app = express();


app.use(express.json());

app.use(cors());

//route
app.use("/api/admin", imageRoute);
app.use("/api/admin", userRoute);

app.use(globalErrorHandle);

//test
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

export default app;
