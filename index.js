import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

// Importar las rutas correctamente
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import attachmentRoutes from "./routes/attachment.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import subjetRoutes from "./routes/subject.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilizar las rutas correctamente
app.use(userRoutes);
app.use(authRoutes);
app.use(eventRoutes);
app.use(attachmentRoutes);
app.use(scheduleRoutes);
app.use(subjetRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
