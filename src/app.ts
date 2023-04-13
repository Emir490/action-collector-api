import "dotenv/config";
import express from  "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";

const app = express();

const corsOptions = {
    origin: process.env.WEB_URL,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(router);

const PORT = process.env.PORT || 4000;
db().then(() => console.log("Conexión Ready"));

app.listen(PORT, () => {
    console.log(`Server Ready on port ${PORT}`);
});