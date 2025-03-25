
require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); /** Middleware to parse JSON */

/** Sample data (temporary in-memory storage);*/

let users = [
	{id: 1, name: "Julia"},
	{id:2, name: "Jewel"}
];

//GET all users
app.get("/users", (req, res) => {
	res.json(users);
});

//GET a single user by ID
app.get("/users/:id", (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id));
	if(!user) return res.status(404).json({ message: "User not found"});
	res.json(user);
});

//POST -- Add a new user

app.post("/users", (req, res) => {
	const { name } = req.body;
	const newUser = { id: users.length +1, name};
	users.push(newUser);
	res.status(201).json(newUser);
});

// PUT --Update a user
app.put("/users/:id", (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id));
	if (!user) return res.status(404).json({ message: "User not found"});
	user.name = req.body.name || user.name;
	res.json(user);
});

//DELETE -- Remove a user
app.delete("/users/:id", (req, res) => {
	users = users.filter(u => u.id !== parseInt(req.params.id));
	res.json({ message: "User deleted" });
});



app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
