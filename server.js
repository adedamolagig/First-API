const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	res.send("Hello, World! Your API is working");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
