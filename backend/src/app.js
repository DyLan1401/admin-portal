import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import imageRoute from "./routes/imageRoute.js"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import globalErrorHandle from "./middleware/globalErrorHandle.js"
import { SESSION_ABSOLUTE_TTL_MS } from "./config/sessionConfig.js";
import InMemorySessionStore from "./session/memorySessionStore.js";
export const sessionStore = new InMemorySessionStore();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(session(
    ({
        store: sessionStore,
        secret: process.env.SESSION_SECRET,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            // name: "sessionID",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // chỉ true khi có HTTPS
            sameSite: "lax",
            maxAge: SESSION_ABSOLUTE_TTL_MS,
            path: "/",
        },
    })
));

//route
app.use("/api/admin", imageRoute);
app.use("/api/admin", userRoute);
app.use("/api/auth", authRoute)

app.use(globalErrorHandle);

//test
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

export default app;
