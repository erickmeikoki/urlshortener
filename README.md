# URL Shortener

A modern URL shortener application built with React, Node.js, and Express. This application allows users to shorten long URLs, generate QR codes, and track analytics for shortened links.

## Features

- 🔗 URL shortening with custom aliases
- 📊 Analytics tracking (clicks, timestamps)
- 📱 QR code generation for shortened URLs
- 🎨 Modern Material-UI interface
- 🌐 Responsive design
- 🔒 Secure URL validation

## Tech Stack

- **Frontend:**

  - React
  - Material-UI
  - QRCode.react
  - Axios

- **Backend:**
  - Node.js
  - Express
  - nanoid (for generating short IDs)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/erickmeikoki/urlshortener.git
cd urlshortener
```

2. Install dependencies:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Start the development servers:

```bash
# Start the frontend (from root directory)
npm start

# Start the backend (from backend directory)
npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5001`.

## Usage

1. Enter a long URL in the input field
2. Click "Shorten" to generate a shortened URL
3. Copy the shortened URL or scan the generated QR code
4. View analytics by clicking on the analytics button

## API Endpoints

- `POST /api/urls` - Create a new shortened URL
- `GET /api/urls/:shortId` - Redirect to the original URL
- `GET /api/urls/:shortId/analytics` - Get analytics for a shortened URL

## Deployment

### Frontend Deployment (Vercel)

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:

```bash
npm install -g vercel
```

3. Deploy the frontend:

```bash
# From the root directory
vercel
```

4. Configure environment variables in Vercel dashboard:

```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend Deployment (Heroku)

1. Create a Heroku account at https://heroku.com
2. Install Heroku CLI:

```bash
npm install -g heroku
```

3. Login to Heroku:

```bash
heroku login
```

4. Create a new Heroku app:

```bash
heroku create your-app-name
```

5. Deploy the backend:

```bash
# From the backend directory
git push heroku main
```

6. Configure environment variables in Heroku dashboard:

```
PORT=5001
```

### Alternative Backend Hosting (Render)

1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables:
     ```
     PORT=5001
     ```

### Important Notes for Deployment

1. Update the frontend's API URL in `src/App.js` to point to your deployed backend URL
2. Ensure CORS is properly configured in the backend to allow requests from your frontend domain
3. Consider using a custom domain for your shortened URLs
4. For production, consider adding:
   - Rate limiting
   - SSL certificates
   - Database persistence (currently using in-memory storage)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the beautiful components
- QRCode.react for QR code generation
- nanoid for generating unique short IDs
