const express = require('express');
const database = require("./config/database");
const fileUpload = require("express-fileupload");
const {cloudinaryConnect} = require("./config/cloudinary");
const cors = require("cors");
const port = process.env.PORT | 5000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
database.connect();

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);

cloudinaryConnect();

app.options("*", cors());
app.use(cors({
    origin:"*",
}));

app.use("/api/v1/", require("./routes/Video"));

// Basic route
app.get("/", (req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running....",
    })
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

