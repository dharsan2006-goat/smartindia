import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Books/addBook.css';
import 'animate.css';

const BookUpload = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: ''
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidation(e.target.files[0]);
    }
  };

  const handleFileValidation = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf') {
      setMessage({ type: 'error', text: 'Only PDF files are allowed!' });
      setFile(null);
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 10MB!' });
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setMessage({ type: '', text: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a PDF file!' });
      return;
    }

    const data = new FormData();
    data.append('bookFile', file);
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('category', formData.category);
    data.append('description', formData.description);

    try {
      setUploading(true);
      setUploadProgress(0);
      
      await axios.post('http://localhost:8082/api/books/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      setMessage({ type: 'success', text: 'Book uploaded successfully!' });
      setTimeout(() => navigate('/books', { replace: true }), 1500);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Upload failed. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section>
      <div className='form-container animate__animated animate__backInDown'>
        <form className='add-book-form' onSubmit={handleSubmit}>
          <h1>Upload a new book.</h1>
          
          {/* Drag and Drop Area */}
          <div
            className={`drag-drop-area ${
              dragActive ? 'drag-active' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="file-label">
              <div className="file-icon">{dragActive ? '📥' : '📄'}</div>
              <p>{file ? file.name : 'Drag & Drop PDF or Click to Browse'}</p>
              {file && <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>}
              <span className="browse-btn">Choose File</span>
              <small className="file-info">PDF only • Max 10MB</small>
            </label>
          </div>

          <div className='input-container'>
            <label>Title: </label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              placeholder='Enter book title'
              required
            />
          </div>

          <div className='input-container'>
            <label>Author: </label>
            <input
              type='text'
              name='author'
              value={formData.author}
              onChange={handleInputChange}
              placeholder='Enter author name'
              required
            />
          </div>

          <div className='input-container'>
            <label>Category: </label>
            <input
              type='text'
              name='category'
              value={formData.category}
              onChange={handleInputChange}
              placeholder='e.g., Fiction, Science, History'
              required
            />
          </div>

          <div className='input-container'>
            <label>Description: </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              placeholder='Enter book description'
              rows='4'
              required
            />
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className='progress-container'>
              <div className='progress-text'>
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className='progress-bar'>
                <div className='progress-fill' style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}

          {/* Messages */}
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button
            type='submit'
            className='addBook-btn'
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Book'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookUpload;
