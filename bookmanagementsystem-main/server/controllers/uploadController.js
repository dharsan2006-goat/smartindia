const fs = require('fs');
const path = require('path');

// JSON file to store uploaded books
const uploadedBooksFile = path.join(__dirname, '../model/uploadedBooks.json');

// Initialize file if it doesn't exist
if (!fs.existsSync(uploadedBooksFile)) {
  fs.writeFileSync(uploadedBooksFile, JSON.stringify([]));
}

// Handle book upload
const uploadBook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    const { title, author, category, description } = req.body;

    if (!title || !author || !category || !description) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const newBook = {
      id: Date.now(),
      title,
      author,
      category,
      description,
      filePath: req.file.path,
      fileName: req.file.filename,
      uploadDate: new Date().toISOString()
    };

    // Read existing books
    const books = JSON.parse(fs.readFileSync(uploadedBooksFile, 'utf8'));
    books.push(newBook);
    
    // Save to file
    fs.writeFileSync(uploadedBooksFile, JSON.stringify(books, null, 2));

    res.status(201).json({
      message: 'Book uploaded successfully!',
      book: newBook
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
};

// Get all uploaded books
const getAllUploadedBooks = async (req, res) => {
  try {
    const books = JSON.parse(fs.readFileSync(uploadedBooksFile, 'utf8'));
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

module.exports = { uploadBook, getAllUploadedBooks };
