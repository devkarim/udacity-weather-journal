/* Global Variables */
const API_KEY = '512e72f655a61b389240c0c30653b552';
const WEATHER_API_URI = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Fetch current weather via ZIP code
const getTemperatureByZipCode = async (baseURI, zipCode, apiKey) => {
  const res = await fetch(`${baseURI}&zip=${zipCode},us&appid=${apiKey}`);
  const data = await res.json();
  return data['main']['temp'];
};

// Save current data to our server
const saveData = async (url, { temperature, date, userRes }) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ temperature, date, userRes }),
  });
  const data = await res.json();
  return data;
};

// Retrieve data from our server
const retrieveData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// Once user has clicked "generate" button
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const zipCode = document.getElementById('zip').value;
  const userRes = document.getElementById('feelings').value;
  getTemperatureByZipCode(WEATHER_API_URI, zipCode, API_KEY)
    .then((temperature) =>
      saveData(`/weather`, {
        temperature,
        date: newDate,
        userRes,
      })
    )
    .then(updateUI)
    .catch((err) => console.error('Error', err));
});

// Update UI with our data from the server
const updateUI = async () => {
  const data = await retrieveData(`/weather`);
  if (!data.temperature) return false;
  document.getElementById('date').innerHTML = 'On ' + data.date;
  document.getElementById('temp').innerHTML = data.temperature + ' °C';
  document.getElementById('content').innerHTML = data.userRes || 'N/A';
  return true;
};

// Update UI on start
updateUI();
