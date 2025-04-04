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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the beautiful components
- QRCode.react for QR code generation
- nanoid for generating unique short IDs
