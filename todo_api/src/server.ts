
import app from "./app";
import db from "./config/database";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
    try {
        const connection = await db.getConnection();

        console.log("MySQL Database Connected Successfully!");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

startServer();
