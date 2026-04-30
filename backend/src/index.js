const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./config/connectDatabase");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const seedRecipes = require("./data/seedRecipes");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.use((error, _request, response, _next) => {
  return response.status(500).json({
    message: error.message || "Unexpected server error.",
  });
});

async function startServer() {
  try {
    await connectDatabase(process.env.MONGODB_URI);
    await seedRecipes();

    app.listen(port, () => {
      process.stdout.write(`API server is running on http://localhost:${port}\n`);
    });
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}

startServer();
