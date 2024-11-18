import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// In-memory data store for anecdotes (simulating db.json)
let anecdotes = [
  {
    content: "If it hurts, do it more often",
    id: "47145",
    votes: 33,
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: "21149",
    votes: 18,
  },
  {
    content:
      "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    id: "69581",
    votes: 8,
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    id: "36975",
    votes: 6,
  },
  {
    content: "Premature optimization is the root of all evil.",
    id: "25170",
    votes: 5,
  },
  {
    id: "f773",
    content: "New Ancedote created by Ella",
    votes: 1,
  },
];

// Enable CORS to allow frontend on port 3001 to access the backend
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// API Endpoints

// GET /anecdotes - Fetch all anecdotes
app.get("/anecdotes", (req, res) => {
  res.json(anecdotes);
});

// POST /anecdotes - Create a new anecdote
app.post("/anecdotes", (req, res) => {
  const { content } = req.body;
  if (!content || content.length < 5) {
    return res
      .status(400)
      .json({ error: "Content must have length 5 or more" });
  }

  const newAnecdote = {
    id: (anecdotes.length + 1).toString(),
    content,
    votes: 0,
  };

  anecdotes.push(newAnecdote);
  res.status(201).json(newAnecdote);
});

// PATCH /anecdotes/:id - Update votes for a specific anecdote
app.patch("/anecdotes/:id", (req, res) => {
  const { id } = req.params;
  const { votes } = req.body;

  const anecdote = anecdotes.find((a) => a.id === id);
  if (!anecdote) {
    return res.status(404).json({ error: "Anecdote not found" });
  }

  anecdote.votes = votes;
  res.json(anecdote);
});

// Serve the static files from React (dist folder)
app.use(express.static(path.join(__dirname, "dist")));

// For any other routes, send the React app (React Router handling frontend routes)
app.get("*", (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
