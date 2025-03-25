
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //Middleware to parse JSON

app.get("/", (req, res) => {
	res.json({ message: "Hello, World! Your API is working"});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
