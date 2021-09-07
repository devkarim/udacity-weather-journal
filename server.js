// Libraries we need
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Global vars
let projectData = {};
const port = 5000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, () => console.log(`Server listening on localhost:${port}`));

// @route     GET /weather
// @desc      Send projectData to the user
// @access    Public
app.get('/weather', (_, res) => res.send(projectData));

// @route     POST /weather
// @desc      Sets new projectData
// @access    Public
app.post('/weather', (req, res) => {
  const { temperature, date, userRes } = req.body;
  projectData = { temperature, date, userRes };
  return res.send(projectData);
});
