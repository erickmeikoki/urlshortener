# URL Shortener

A modern URL shortener application built with React, Node.js, and MongoDB. This application allows users to shorten long URLs, track analytics, and generate QR codes for shortened URLs.

## Live Demo

- Frontend: [https://urlshortener.vercel.app](https://urlshortener.vercel.app)
- Backend API: [https://urlshortener-backend.onrender.com](https://urlshortener-backend.onrender.com)

## Features

- 🔗 URL shortening with custom short IDs
- 📊 Analytics tracking (clicks, last accessed)
- 📱 QR code generation for shortened URLs
- 🌐 CORS support for cross-origin requests
- 🔒 Secure MongoDB integration
- 📱 Responsive design for all devices
- 🎨 Modern UI with Material-UI components
- 📝 URL validation and error handling

## Tech Stack

### Frontend

- React.js
- Material-UI (@mui/material)
- Axios for API calls
- QRCode.react for QR code generation

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Nanoid for short URL generation
- Dotenv for environment management

## Hosting

### Frontend

The frontend is hosted on [Vercel](https://vercel.com), providing:

- Automatic deployments from GitHub
- Global CDN
- SSL encryption
- Custom domain support

### Backend

The backend is hosted on [Render](https://render.com), offering:

- Automatic deployments from GitHub
- Free SSL certificates
- Environment variable management
- MongoDB integration
- Health monitoring

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/erickmeikoki/urlshortener.git
   cd urlshortener
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Create environment files:
   - Frontend (.env):
     ```
     REACT_APP_API_URL=http://localhost:5001
     ```
   - Backend (.env):
     ```
     PORT=5001
     MONGODB_URI=mongodb://localhost:27017/urlshortener
     FRONTEND_URL=http://localhost:3000
     BACKEND_URL=http://localhost:5001
     ```

### Running Locally

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `POST /api/urls` - Create a new short URL
- `GET /:shortId` - Redirect to original URL
- `GET /api/urls/:shortId/analytics` - Get URL analytics

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically or manually

### Backend (Render)

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Set environment variables
5. Deploy

## Environment Variables

### Frontend

- `REACT_APP_API_URL`: Backend API URL (e.g., https://urlshortener-backend.onrender.com)

### Backend

- `PORT`: Server port (default: 5001)
- `MONGODB_URI`: MongoDB connection string
- `FRONTEND_URL`: Frontend application URL
- `BACKEND_URL`: Backend API URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful components
- Nanoid for the URL shortening algorithm
- Vercel and Render for hosting services
