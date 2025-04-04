import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	Box,
	Paper,
	Snackbar,
	CircularProgress,
	Fade,
	Zoom,
	Grid,
	Card,
	CardContent,
	IconButton,
	Tooltip
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QrCode2, ContentCopy, History, Analytics } from "@mui/icons-material";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

const theme = createTheme({
	palette: {
		primary: {
			main: "#2563eb",
			light: "#60a5fa",
			dark: "#1e40af"
		},
		secondary: {
			main: "#7c3aed",
			light: "#a78bfa",
			dark: "#5b21b6"
		},
		background: {
			default: "#f8fafc",
			paper: "#ffffff"
		}
	},
	typography: {
		fontFamily: "'Inter', 'Roboto', sans-serif",
		h1: {
			fontWeight: 700,
			fontSize: "3.5rem",
			background: "linear-gradient(45deg, #2563eb, #7c3aed)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent"
		},
		h6: {
			fontWeight: 400,
			color: "#64748b"
		}
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: 8,
					padding: "10px 20px",
					transition: "all 0.2s ease-in-out",
					"&:hover": {
						transform: "translateY(-2px)"
					}
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 16,
					boxShadow:
						"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: 8
					}
				}
			}
		}
	}
});

// API base URL
const API_BASE_URL = "http://localhost:5001";

// Configure axios defaults
const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
	(config) => {
		console.log("Making request to:", config.url);
		console.log("Request config:", config);
		return config;
	},
	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);

// Add response interceptor for logging
axiosInstance.interceptors.response.use(
	(response) => {
		console.log("Response received:", response);
		return response;
	},
	(error) => {
		console.error("Response error:", error);
		if (error.response) {
			console.error("Error response data:", error.response.data);
			console.error("Error response status:", error.response.status);
			console.error("Error response headers:", error.response.headers);
		} else if (error.request) {
			console.error("Error request:", error.request);
		}
		return Promise.reject(error);
	}
);

function App() {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: ""
	});
	const [urlHistory, setUrlHistory] = useState([]);
	const [showQRCode, setShowQRCode] = useState(false);
	const [analytics, setAnalytics] = useState(null);

	// Load URL history from localStorage on component mount
	useEffect(() => {
		const savedHistory = localStorage.getItem("urlHistory");
		if (savedHistory) {
			setUrlHistory(JSON.parse(savedHistory));
		}
	}, []);

	// Save URL history to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("urlHistory", JSON.stringify(urlHistory));
	}, [urlHistory]);

	const validateUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch (e) {
			return false;
		}
	};

	const formatUrl = (url) => {
		if (!url.startsWith("http://") && !url.startsWith("https://")) {
			return `https://${url}`;
		}
		return url;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!url) {
			setSnackbar({
				open: true,
				message: "Please enter a URL"
			});
			return;
		}

		const formattedUrl = formatUrl(url);
		if (!validateUrl(formattedUrl)) {
			setSnackbar({
				open: true,
				message: "Please enter a valid URL"
			});
			return;
		}

		try {
			setLoading(true);
			const response = await axiosInstance.post("/urls", {
				originalUrl: formattedUrl
			});
			setShortUrl(response.data.shortUrl);
			setShowQRCode(true);

			// Add to history
			const newUrlEntry = {
				originalUrl: formattedUrl,
				shortUrl: response.data.shortUrl,
				createdAt: new Date().toISOString()
			};
			setUrlHistory((prev) => [newUrlEntry, ...prev].slice(0, 10)); // Keep last 10 URLs

			// Fetch analytics
			fetchAnalytics(response.data.shortUrl);
		} catch (error) {
			console.error("Detailed error:", error);
			let errorMessage = "Error creating short URL";

			if (error.response) {
				errorMessage = error.response.data.error || errorMessage;
			} else if (error.request) {
				errorMessage =
					"Could not connect to server. Please make sure the backend is running.";
			}

			setSnackbar({
				open: true,
				message: errorMessage
			});
		} finally {
			setLoading(false);
		}
	};

	const fetchAnalytics = async (url) => {
		try {
			const shortId = url.split("/").pop();
			console.log("Fetching analytics for URL:", url);
			console.log("Extracted shortId:", shortId);

			const response = await axiosInstance.get(
				`/api/urls/${shortId}/analytics`
			);
			console.log("Analytics response:", response.data);
			setAnalytics(response.data);
		} catch (error) {
			console.error("Error fetching analytics:", error);
			// Don't show error to user, just log it
			setAnalytics(null);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(shortUrl);
		setSnackbar({
			open: true,
			message: "URL copied to clipboard!"
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					minHeight: "100vh",
					background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
					py: 8
				}}
			>
				<Container maxWidth="md">
					<Fade in={true} timeout={1000}>
						<Box sx={{ mb: 6, textAlign: "center" }}>
							<Typography variant="h1" component="h1" gutterBottom>
								URL Shortener
							</Typography>
							<Typography variant="h6" color="textSecondary" paragraph>
								Enter a long URL and get a shortened version instantly!
							</Typography>
						</Box>
					</Fade>

					<Zoom in={true} timeout={1000}>
						<Paper
							elevation={3}
							sx={{
								p: 4,
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(10px)"
							}}
						>
							<form onSubmit={handleSubmit}>
								<TextField
									fullWidth
									label="Enter your URL"
									variant="outlined"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									sx={{ mb: 3 }}
									placeholder="https://example.com"
									error={url && !validateUrl(formatUrl(url))}
									helperText={
										url && !validateUrl(formatUrl(url))
											? "Please enter a valid URL"
											: ""
									}
								/>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
									disabled={loading}
									size="large"
									sx={{
										mb: 2,
										height: 48,
										fontSize: "1.1rem"
									}}
								>
									{loading ? (
										<CircularProgress size={24} color="inherit" />
									) : (
										"Shorten URL"
									)}
								</Button>
							</form>

							{shortUrl && (
								<Fade in={true} timeout={500}>
									<Box sx={{ mt: 4 }}>
										<Typography variant="h6" gutterBottom color="textSecondary">
											Your shortened URL:
										</Typography>
										<Paper
											variant="outlined"
											sx={{
												p: 2,
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												background: "rgba(255, 255, 255, 0.5)"
											}}
										>
											<Typography
												sx={{
													overflow: "hidden",
													textOverflow: "ellipsis",
													flex: 1,
													fontFamily: "monospace"
												}}
											>
												{shortUrl}
											</Typography>
											<Box sx={{ display: "flex", gap: 1 }}>
												<Tooltip title="Copy URL">
													<IconButton onClick={handleCopy} color="primary">
														<ContentCopy />
													</IconButton>
												</Tooltip>
												<Tooltip title="Generate QR Code">
													<IconButton
														onClick={() => setShowQRCode(!showQRCode)}
														color="primary"
													>
														<QrCode2 />
													</IconButton>
												</Tooltip>
											</Box>
										</Paper>

										{showQRCode && (
											<Box sx={{ mt: 3, textAlign: "center" }}>
												<Paper sx={{ p: 2, display: "inline-block" }}>
													<QRCodeSVG value={shortUrl} size={200} />
												</Paper>
											</Box>
										)}

										{analytics && (
											<Box sx={{ mt: 3 }}>
												<Typography
													variant="h6"
													gutterBottom
													color="textSecondary"
												>
													Analytics:
												</Typography>
												<Grid container spacing={2}>
													<Grid item xs={6}>
														<Card>
															<CardContent>
																<Typography color="textSecondary" gutterBottom>
																	Clicks
																</Typography>
																<Typography variant="h4">
																	{analytics.clicks}
																</Typography>
															</CardContent>
														</Card>
													</Grid>
													<Grid item xs={6}>
														<Card>
															<CardContent>
																<Typography color="textSecondary" gutterBottom>
																	Created
																</Typography>
																<Typography variant="h6">
																	{new Date(
																		analytics.createdAt
																	).toLocaleDateString()}
																</Typography>
															</CardContent>
														</Card>
													</Grid>
												</Grid>
											</Box>
										)}
									</Box>
								</Fade>
							)}
						</Paper>
					</Zoom>

					{urlHistory.length > 0 && (
						<Fade in={true} timeout={1000}>
							<Paper sx={{ mt: 4, p: 3 }}>
								<Typography variant="h6" gutterBottom>
									<History sx={{ mr: 1, verticalAlign: "middle" }} />
									Recent URLs
								</Typography>
								<Box sx={{ maxHeight: 300, overflow: "auto" }}>
									{urlHistory.map((entry, index) => (
										<Paper
											key={index}
											sx={{
												p: 2,
												mb: 1,
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center"
											}}
										>
											<Box sx={{ flex: 1, mr: 2 }}>
												<Typography
													sx={{
														overflow: "hidden",
														textOverflow: "ellipsis",
														whiteSpace: "nowrap"
													}}
												>
													{entry.originalUrl}
												</Typography>
												<Typography
													variant="body2"
													color="textSecondary"
													sx={{ fontFamily: "monospace" }}
												>
													{entry.shortUrl}
												</Typography>
											</Box>
											<IconButton
												onClick={() => {
													setShortUrl(entry.shortUrl);
													setShowQRCode(false);
													fetchAnalytics(entry.shortUrl);
												}}
											>
												<Analytics />
											</IconButton>
										</Paper>
									))}
								</Box>
							</Paper>
						</Fade>
					)}

					<Snackbar
						open={snackbar.open}
						autoHideDuration={3000}
						onClose={() => setSnackbar({ ...snackbar, open: false })}
						message={snackbar.message}
						anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					/>
				</Container>
			</Box>
		</ThemeProvider>
	);
}

export default App;
