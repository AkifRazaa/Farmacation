require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const MongoDB = require("./db");
const cors = require("cors");
const Admin = require("./Models/Admin");
const Expert = require("./Models/Expert");
const cloudinary = require("cloudinary").v2;

const http = require("http");
const socketIO = require("socket.io");

app.use(cors());
app.use(
  express.json({
    limit: "20mb",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT || 5000;

MongoDB();

app.use("/api", require("./Routes/Login/SendOtp"));
app.use("/api", require("./Routes/Login/VerifyOtp"));
app.use("/api", require("./Routes/Login/UpdateProfile"));

app.use("/api", require("./Routes/Community/CreatePost"));
app.use("/api", require("./Routes/Community/GetPosts"));

app.use("/api", require("./Routes/Community/HandleUnlike"));
app.use("/api", require("./Routes/Community/HandleLike"));
app.use("/api", require("./Routes/Community/HandleReply"));

// Admin Routes
app.use("/api", require("./Routes/Admin/AddCrop"));
app.use("/api", require("./Routes/Admin/DeleteCrop"));
app.use("/api", require("./Routes/Admin/AddContent"));

app.use("/api", require("./Routes/Admin/Community/ApprovePost"));
app.use("/api", require("./Routes/Admin/Community/DeletePost"));

app.use("/api", require("./Routes/Admin/AddExpert"));
app.use("/api", require("./Routes/Admin/ConsultationRequest"));

//Expert route:
app.use("/api", require("./Routes/Consultation/GetConsultationRequest"));
app.use("/api", require("./Routes/Chat/ChatListRoute"));
app.use("/api", require("./Routes/Chat/GetMessages"));



// ! Code to add admin
// app.post("/admin", async (req, res) => {
//   const password = "123456";

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const admin = new Admin({
//     name: "Farmacation",
//     email: "admin@gmail.com",
//     password: hashedPassword,
//     phoneNumber: "+923059093435",
//   });

//   await admin.save();

//   console.log("Admin saved");
// });

app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ email });
    if (user) {
      const comparedPassword = await bcrypt.compare(password, user.password);
      if (comparedPassword) {
        return res.status(200).json({
          success: true,
          message: "Login successful",
          userName: user.name,
          userId: user._id,
          role: "admin",
        });
      }
    }

    user = await Expert.findOne({ email });
    if (user) {
      const comparedPassword = await bcrypt.compare(password, user.password);
      if (comparedPassword) {
        return res.status(200).json({
          success: true,
          message: "Login successful",
          userName: user.name,
          userId: user._id,
          role: "expert",
        });
      }
    }

    res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/upload-image", async (req, res) => {
  const imageUrl = req.body.imageUrl;

  // console.log(imageUrl);
  try {
    const cloudinaryRes = await cloudinary.uploader.upload(imageUrl, {
      folder: "/Farmacation",
      format: "png",
    });

    // console.log(cloudinaryRes.secure_url);

    res.status(200).json({ imageUrl: cloudinaryRes.secure_url });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

// Define Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle private messages
  socket.on("private_message", async (data) => {
    try {
      // Check if the message contains image data
      if (data.imageUrl) {
        // If the message contains an image URL, create a new message object with the image URL
        const newMessage = new Message({
          sender: data.sender,
          receiver: data.recipient,
          imageUrl: data.imageUrl,
        });

        // Save the new Message document to the database
        await newMessage.save();

        // Emit the message to the recipient's room
        socket.to(data.room).emit("private_message", newMessage);

        console.log("Private message with image:", newMessage);
      } else {
        // If the message does not contain an image URL, create a new message object with text content
        const newMessage = new Message({
          sender: data.sender,
          receiver: data.recipient,
          content: data.content,
        });

        // Save the new Message document to the database
        await newMessage.save();

        // Emit the message to the recipient's room
        socket.to(data.room).emit("private_message", newMessage);

        console.log("Private message:", newMessage);
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle room joining
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
