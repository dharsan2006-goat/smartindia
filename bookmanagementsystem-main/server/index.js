const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8082;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle url encoded data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json data
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/books', require('./routes/api/books'));
app.use('/api/books', require('./routes/api/upload'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
