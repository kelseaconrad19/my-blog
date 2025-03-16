require('dotenv').config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const connectDB = require("./server/config/db");

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to DB
connectDB()

app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set("view engine", "ejs");

app.use('/', require('./server/routes/main'));

/* form to create a new post */
app.get("/posts/new", (req, res) => {
  res.render("new-post.ejs");
});

/* View a single post */
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id)

  if (!post) {
    return res.status(404).send("Post not found")
  }
  res.render("post.ejs", { post });
});

/* Form to update existing post */
app.get("/posts/:id/edit", (req, res) => {
  const post_id = req.params.id;
  res.render("new-post.ejs", { name: req.body.name });
});

/* Submit new post */
app.post("/posts", (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
  };
  posts.push(newPost); // storing the new post
  res.redirect("/"); // redirect to home page
});

/* Submit updated post */
app.put("/posts/:id", (req, res) => {
  const title = req.body.title; // get title from form
  const image = req.body.image;
  const content = req.body.content;
  res.render("update-post.ejs", { title, image, content }); // render new post form with data pre-filled
});

/* Delete a post */
app.delete("/posts/:id", (req, res) => {
  res.render("view-post.ejs", { name: req.body.name });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});