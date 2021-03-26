const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();
const colors = require("colors");
// const { connectDB } = require("./database/connectDB");
const { ConnectMongo } = require("./database/connectMongo");

const app = express();
const auth = require("./route/api/auth");
const PORT = 5000;
const { errorMiddleware } = require("./middleware/errorMiddleware");
const User = require("./database/models/User");
const user = require("./route/api/user");
const role = require("./route/api/role");
const product = require("./route/api/product");
const category = require("./route/api/category");

const cors = require("cors");
const upload = require("./route/api/upload");
const mysql_auth = require("./route/api/mysql_auth");
const { baseAuth } = require("./middleware/baseAuth");
const { getAllTodos, AddTodos } = require("./controllers/todoController");
//config env

require("./sql/mysql.js");
ConnectMongo.getConnect();
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "hello babyyy",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//Using mongoDB
//route
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/role", role);
app.use("/api/v1/product", product);
app.use("/api/v1/category", category);
app.use("/api/v1/upload", upload);
app.get("/api/v1/todos", getAllTodos);
app.post("/api/v1/todo", AddTodos);
//Using mySQL
app.use("/api/v1/mysql_auth", mysql_auth);

app.get("/test", baseAuth);
//viet duoi route
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`.yellow.bgBlack);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const messages = [];
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", (reason) => {
    console.log(`disconnect reason: ${reason}`);
  });
  //bat su kien
  socket.on("join", () => {
    // console.log(data);
    // socket.emit("online", "someone joined");
    console.log("ai do dang vao web");
    io.emit("loadMsg", messages);
  });
  socket.on("sendMsg", (msg) => {
    messages.push(msg);
    io.emit("loadMsg", messages);
  });
});
