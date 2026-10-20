const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Optional API route for server-side JSON validation/formatting
app.post('/api/format-json', (req, res) => {
  try {
    const { input, indent = 2, minify = false } = req.body;
    if (!input) {
      return res.status(400).json({ error: 'No input provided' });
    }
    
    const parsed = JSON.parse(input);
    const result = JSON.stringify(parsed, null, minify ? 0 : Number(indent));
    
    res.json({ success: true, result });
  } catch (e) {
    res.status(400).json({ success: false, error: 'Invalid JSON: ' + e.message });
  }
});

// Fallback to index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 ToolNest server is running at http://localhost:${PORT}`);
});