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

// const busboy = require('busboy');

// app.post('/upload', (req, res) => {
//     const bb = busboy({ headers: req.headers, limits: { fileSize: 40 * 1024 * 1024 } }); // Limit to 10MB
    
//     bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
//         console.log(fieldname, file, filename, encoding, mimetype);
//     });

//     bb.on('close', () => {
//         res.status(200).send('Upload complete');
//     });

//     bb.on('error', (err) => {
//         console.error(err);
//         res.status(400).send('Error processing file upload');
//     });

//     req.pipe(bb);
// });
