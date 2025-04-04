const express = require("express");
const dotenv = require("dotenv");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

// URL Schema
const urlSchema = new mongoose.Schema({
	originalUrl: { type: String, required: true },
	shortId: { type: String, required: true, unique: true },
	createdAt: { type: Date, default: Date.now },
	clicks: { type: Number, default: 0 },
	lastAccessed: { type: Date }
});

const Url = mongoose.model("Url", urlSchema);

// Custom CORS middleware
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Credentials", "true");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		res.sendStatus(204);
		return;
	}

	next();
});

// Middleware
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	console.log("Headers:", req.headers);
	next();
});

// Routes
app.post("/api/urls", async (req, res) => {
	try {
		console.log("Received POST request to /api/urls");
		console.log("Request body:", req.body);

		const { originalUrl } = req.body;

		if (!originalUrl) {
			return res.status(400).json({ error: "URL is required" });
		}

		// Generate a unique short ID
		const shortId = nanoid(8);

		// Create and save the URL document
		const url = new Url({
			originalUrl,
			shortId
		});

		await url.save();

		// Return the shortened URL using the backend URL
		const response = {
			originalUrl,
			shortUrl: `http://localhost:5001/${shortId}`
		};
		console.log("Sending response:", response);
		res.json(response);
	} catch (error) {
		console.error("Error creating short URL:", error);
		res.status(500).json({ error: "Server error" });
	}
});

app.get("/:shortId", async (req, res) => {
	try {
		const { shortId } = req.params;

		// Find the URL document
		const url = await Url.findOne({ shortId });

		if (!url) {
			return res.status(404).json({ error: "URL not found" });
		}

		// Increment click count and update last accessed
		url.clicks += 1;
		url.lastAccessed = new Date();
		await url.save();

		// Redirect to original URL
		res.redirect(url.originalUrl);
	} catch (error) {
		console.error("Error redirecting:", error);
		res.status(500).json({ error: "Server error" });
	}
});

// Analytics endpoint
app.get("/api/urls/:shortId/analytics", async (req, res) => {
	try {
		const { shortId } = req.params;
		console.log("Fetching analytics for shortId:", shortId);

		const url = await Url.findOne({ shortId });

		if (!url) {
			console.log("URL not found for shortId:", shortId);
			return res.status(404).json({ error: "URL not found" });
		}

		console.log("Found URL:", url);
		res.json({
			clicks: url.clicks,
			createdAt: url.createdAt,
			lastAccessed: url.lastAccessed
		});
	} catch (error) {
		console.error("Error fetching analytics:", error);
		res.status(500).json({ error: "Server error" });
	}
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`CORS enabled for origin: http://localhost:3000`);
});
