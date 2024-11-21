import e from "express";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT || 4000;
const app = e();

// Req logging
app.use(morgan("dev"));

// cors
const corsOptions = {
  origin: (origin, callback) => {
    // console.log(origin);
    if (!origin || origin.includes("http://localhost:3000")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type", "Set-Cookie"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// allow me to export json from body
app.use(e.json());

app.get("/get-random-fruit-name", (req, res, next) => {
  let fruits = ["apple", "orange", "grapes", "pineapple", "mango"];
  let idx = Math.floor(Math.random() * fruits.length);
  res.json({
    success: true,
    data: fruits[idx],
    message: "Random Fruit generated successfully !",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error!",
  });
});

app.listen(PORT, () => {
  console.log(`SERVER is up and running at port ${PORT}`);
});