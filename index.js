const express = require('express');
const app = express();
const port = 3000;
const items = ['Apple','Banana','Orange'];

// Serve static files from the "public" folder
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

//  Middleware to log incoming requests (MOVED ABOVE routes)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// POST route
app.post('/items', (req, res) => {
  const newItem = req.body.item;
  items.push(newItem);
  res.json(items);
});


// Home route
app.get('/', (req, res) => {
  res.send("Hello, World");
});

// About route
app.get('/about', (req, res) => {
  res.send('About Us');
});

// New Route:
app.get('/items', (req, res) => {
  res.json(items);
});



// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
