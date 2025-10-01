import 'dotenv/config';
import express from 'express';
import user_routes from './routes/user.js';
import post_routes from './routes/post.js';
import { not_found, error_handler } from './middleware/error.js';
import connect_db from './config/db.js';

const port = process.env.PORT || 4000;

connect_db();

const app = express();

app.use(express.json());

app.use('/api/users', user_routes);
app.use('/api/posts', post_routes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/client/dist')));
  app.get('/{*any}', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API....');
  });
}

app.use(not_found);
app.use(error_handler);

app.listen(
  4000,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
