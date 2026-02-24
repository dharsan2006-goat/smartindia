# Book Upload Feature - Setup Instructions

## Prerequisites
- Node.js installed
- MongoDB installed and running on localhost:27017

## Backend Setup

1. Navigate to server directory:
```bash
cd bookmanagementsystem-main/server
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start MongoDB service:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

4. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:8082

## Frontend Setup

1. Navigate to client directory:
```bash
cd bookmanagementsystem-main/client
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

App will run on http://localhost:3000

## Features

### Book Upload Component
- **Drag & Drop**: Drag PDF files directly into the upload area
- **File Browser**: Click "Browse Files" to select PDF from file system
- **Validation**: 
  - Only PDF files allowed
  - Maximum file size: 10MB
- **Form Fields**:
  - Book Title (required)
  - Author (required)
  - Category (required)
  - Description (required)
- **Progress Bar**: Real-time upload progress indicator
- **Modern UI**: Built with Tailwind CSS
- **Animations**: Smooth hover effects and drag-over animations

### Backend API
- **POST /api/books/upload**: Upload book with file and metadata
- **GET /api/books/uploaded**: Get all uploaded books
- Files stored in: `server/uploads/`
- Book metadata stored in MongoDB

## Usage

1. Register/Login to the application
2. Click "Upload Book" in the navigation menu
3. Drag & drop a PDF file or click "Browse Files"
4. Fill in book details (title, author, category, description)
5. Click "Upload Book"
6. Success message will appear and redirect to books page

## File Structure

```
client/
  src/
    pages/
      Books/
        BookUpload.jsx          # Main upload component

server/
  config/
    database.js                 # MongoDB connection
    multerConfig.js            # File upload configuration
  controllers/
    uploadController.js        # Upload logic
  model/
    UploadedBook.js           # MongoDB schema
  routes/
    api/
      upload.js               # Upload routes
  uploads/                    # Uploaded files directory
```

## Technologies Used

### Frontend
- React
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express
- Multer (file upload)
- Mongoose (MongoDB ODM)
- MongoDB

## Error Handling

- Invalid file type: "Only PDF files are allowed!"
- File too large: "File size must be less than 10MB!"
- Missing fields: "All fields are required!"
- Upload failure: Displays server error message
