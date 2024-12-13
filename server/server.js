const express = require('express');
const app = express();
const path = require('path');
// Get the parent directory of __dirname
const parentDir = path.resolve(__dirname, '..');



  // Serve the HTML file
  app.get('/fcp/', (req, res) => {
    res.sendFile(path.join(parentDir, 'client/fcp/index.html'));
  });

app.get('/lcp/', (req, res) => {
res.sendFile(path.join(parentDir, 'client/lcp/index.html'));
});

app.get('/cls/', (req, res) => {
    res.sendFile(path.join(parentDir, 'client/cls/index.html'));
    });

app.get('/inp/', (req, res) => {
    res.sendFile(path.join(parentDir, 'client/inp/index.html'));
    });


app.use((req, res, next) => {
    let delay = 2000; // Delay all requests by 5 seconds
    if(req.url ==='/static/images/banner.png')
    {
        delay = delay+3000
    }
    console.log(`Delaying request for ${req.url} by ${delay}ms`);
    setTimeout(next, delay);
  });



// Middleware to serve static files
app.use('/static', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'no-store');
    },
  }));

// Simulate slow responses for specific resources
const simulateSlowResponse = (filePath, delay, res) => {

    setTimeout(() => {
        res.sendFile(filePath);
    }, delay);
};

app.get('/static/css/styles.css', (req, res) => {
    simulateSlowResponse(path.join(__dirname, 'public/css/styles.css'), 3000, res);
});

app.get('/static/css/gallery.css', (req, res) => {
    simulateSlowResponse(path.join(__dirname, 'public/css/gallery.css'), 500, res);
});

app.get('/static/js/script.js', (req, res) => {
    simulateSlowResponse(path.join(__dirname, 'public/js/script.js'), 1000, res);
});

app.get('/static/js/gallery.js', (req, res) => {
    simulateSlowResponse(path.join(__dirname, 'public/js/gallery.js'), 1000, res);
});

app.get('/static/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    console.log(`Delaying response for ${imageName}`);
   const start = Date.now();
    simulateSlowResponse(path.join(__dirname, `public/images/${imageName}`), 1000, res);
});

app.get('/static/fonts/demo-font.woff2', (req, res) => {
    simulateSlowResponse(path.join(__dirname, 'public/fonts/demo-font.woff2'), 1000, res);
});

// Default route
app.get('/', (req, res) => {
    res.send('Node Server Running');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
