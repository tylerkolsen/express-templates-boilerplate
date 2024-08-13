import express from 'express';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import path from 'path';
import url from 'url';

// The project root directory
const rootDir = url.fileURLToPath(new URL('.', import.meta.url));
// Allows you to change the port number if needed
const port = '8000';

const app = express();

// Configure the Express app
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

app.get('/', (req, res) => {
  res.render('home.html')
})

app.get('/hello', (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Hello!</h2>
        <a href="/">Back to Home</a>
      </body>
    </html>
    `)
})

// Displays the form
app.get('/form', (req, res) => {
  res.render('form.html')
})

// Handles the form
app.get('/welcome', (req, res) => {
  const person = req.query.person;
  res.send(`Welcome, ${person}!`);
})

// Displays the number-form
app.get('/number-form', (req, res) => {
  res.render('number-form.html')
})

app.post('/fav-number', (req, res) => {
  const favNumber = req.body.favNumber;
  res.send(`Your favorite number is ${favNumber}`)
})

app.get('/user/:username', (req, res) => {
  const username = req.params.username
  res.send(`Your username is: ${username}`)
})

// This displays the form
app.get('/temple-demo', (req, res) => {
  const date = new Date() // This sets the variable date to the current date through a function
  const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`
  // we take the date variable, which has been converted to a Date class, and apply
  // methods that convert the Date (which is a strange computer conversion)
  // and convert it to a human readable version

  res.render('template-demo.html.njk', {
    todaysDate: formattedDate
  })
})

// This utilizes the data from the 'temple-demo' pages form
app.get('/greet', (req, res) => {
  // const person = req.query.person;
  // const wantsCompliments = req.query.wantsCompliments
  // It's easier to read what's happening above, but below we can just
  // deconstruct the object we're receiving to get the variables
  const {person, wantsCompliments} = req.query

  const randomCompliments = lodash.sampleSize(COMPLIMENTS, 3)

  res.render('greet.html.njk', {
    name: person,
    compliments: wantsCompliments ? randomCompliments : false
  })
})

app.get('/inherit', (req, res) => {
  res.render('inherit.html.njk')
})