import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Importar las rutas correctamente
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import attachmentRoutes from "./routes/attachment.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import subjectRoutes from "./routes/subject.routes.js";

const app = express();
const port = process.env.PORT || 3000;

// Definir __dirname utilizando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Utilizar las rutas correctamente
app.use(userRoutes);
app.use(authRoutes);
app.use(eventRoutes);
app.use(attachmentRoutes);
app.use(scheduleRoutes);
app.use(subjectRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
