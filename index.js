import express from "express";
import connection from "./config/db.js";
import userRouter from "./routes/user.route.js";
import noteRouter from "./routes/note.route.js";
import auth from "./middleware/auth.middleware.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors({origin : "*"}))
 
app.use(express.json());
app.use("/user", userRouter);
app.use("/note",auth,  noteRouter);


app.get("/", (req, res) => {
    res.send("Home Page");
});

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`connected to database and server is running on ${PORT}`);
    } catch (error) {
        console.log(`failed to connect to database ${error.message }`);
        
    }
});

