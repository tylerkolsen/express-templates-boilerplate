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
