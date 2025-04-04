const axios = require("axios");

const BACKEND_URL = "https://urlshortener-backend.onrender.com";

async function testBackend() {
	try {
		console.log("Testing backend endpoints...\n");
		console.log("Backend URL:", BACKEND_URL, "\n");

		// Test 1: Check if server is responding
		console.log("1. Testing server availability...");
		const healthCheck = await axios.get(BACKEND_URL, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		console.log("✅ Server is responding");
		console.log("Status:", healthCheck.status);
		console.log("Response:", healthCheck.data, "\n");

		// Test 2: Test URL shortening
		console.log("2. Testing URL shortening...");
		const testUrl = "https://example.com";
		const shortenResponse = await axios.post(
			`${BACKEND_URL}/api/urls`,
			{
				originalUrl: testUrl
			},
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				}
			}
		);
		console.log("✅ URL shortening successful");
		console.log("Shortened URL:", shortenResponse.data.shortUrl);
		const shortId = shortenResponse.data.shortUrl.split("/").pop();
		console.log("Short ID:", shortId, "\n");

		// Test 3: Test URL redirection
		console.log("3. Testing URL redirection...");
		const redirectResponse = await axios.get(`${BACKEND_URL}/${shortId}`, {
			maxRedirects: 0,
			validateStatus: function (status) {
				return status >= 200 && status < 400;
			},
			headers: {
				"Accept": "application/json"
			}
		});
		console.log("✅ Redirection working");
		console.log("Status:", redirectResponse.status);
		console.log("Location:", redirectResponse.headers.location, "\n");

		// Test 4: Test analytics
		console.log("4. Testing analytics...");
		const analyticsResponse = await axios.get(
			`${BACKEND_URL}/api/urls/${shortId}/analytics`,
			{
				headers: {
					"Accept": "application/json"
				}
			}
		);
		console.log("✅ Analytics working");
		console.log("Analytics data:", analyticsResponse.data, "\n");

		console.log("🎉 All tests passed! Backend is working properly.");
	} catch (error) {
		console.error("❌ Test failed:", error.message);
		if (error.response) {
			console.error("Status:", error.response.status);
			console.error("Response:", error.response.data);
			console.error("Headers:", error.response.headers);
		}
		if (error.request) {
			console.error("Request details:", {
				method: error.request.method,
				path: error.request.path,
				headers: error.request.headers
			});
		}
	}
}

testBackend();
