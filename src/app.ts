import "dotenv/config";
import express from  "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(router);

const PORT = process.env.PORT || 4000;
db().then(() => console.log("Conexión Ready"));

app.listen(PORT, () => {
    console.log(`Server Ready on port ${PORT}`);
});