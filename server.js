
require("dotenv").config();
const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3000;

/* Required for parsing JSON request body */

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

/**
app.post("/users", (req, res) => {
	const { name } = req.body;
	const newUser = { id: users.length +1, name};
	users.push(newUser);
	res.status(201).json(newUser);
});*/

/** POST- add new User with validation */
app.post("/users",
	[
		body("name").notEmpty().withMessage("Name is required"),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array()});

		}

		const {name} = req.body;
		const newUser = { id: users.length + 1, name };
		users.push(newUser);
		res.status(201).json(newUser);
	}
);

// PUT --Update a user
app.put("/users/:id",
	[
		body("name").notEmpty().withMessage("Name is required"),

	], 

	(req, res) => {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return res.status(400).json({ errors: errors.array()});
	}
	const user = users.find(u => u.id === parseInt(req.params.id));
	if (!user) return res.status(404).json({ message: "User not found"});
	user.name = req.body.name || user.name;
	res.json(user);
});

//PATCH ----To partially update user
app.patch("/users/:id", 
	[
		body("name").optional().notEmpty().withMessage("Name cannot be empty"),

	],  

	(req, res) => {	
	if (!errors.isEmpty()){
		return res.status(400).json({ errors: errors.array()});
	}

	const user = users.find((u) => u.id === parseInt(id));
	if (!user) { return res.status(404).json({ message: "user not found"});
	}
	if (req.body.name) user.name = req.body.name;

	res.json({ message: "user updated successfully", user });
});

/**DELETE -- Remove a user
app.delete("/users/:id", (req, res) => {
	users = users.filter(u => u.id !== parseInt(req.params.id));
	res.json({ message: "User deleted" });
});*/

// Delete User with Authentication
app.delete("/users/:id", (req, res) => {
	const userIndex = users.findIndex(u => u.id == parseInt(req.params.id));
	if (userIndex === -1){
		return res.status(404).json({ error: "User not found"});
	}

	users.splice(userIndex, 1);
	res.json({ message: "User deleted successfully" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
