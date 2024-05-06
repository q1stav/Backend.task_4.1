const http = require("http");
const express = require("express");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const { addNode, getNotes, removeNote, editNote } = require("./notes.controller");

const port = 3000;
const app = express();

app.set("views", "pages");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNode(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  await editNote(req.params.id,req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
