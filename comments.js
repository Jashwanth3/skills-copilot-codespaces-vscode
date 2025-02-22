// Create web server
// Create a web server that listens to POST requests and saves the comments to a file. The file is called comments.json. It should be an array of objects with the following keys: name, message, date. The date should be a string in the format "2019-09-17T17:00:00.000Z". The web server should respond with the list of comments.
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  const newComment = {
    name: req.body.name,
    message: req.body.message,
    date: new Date().toISOString(),
  };
  comments.push(newComment);
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
  res.json(comments);
});

app.listen(3000);