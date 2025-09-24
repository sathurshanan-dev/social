import 'dotenv/config';
import express from 'express';
import user_routes from './routes/user.js';
import post_routes from './routes/post.js';
import { not_found, error_handler } from './middleware/error.js';
import connect_db from './config/db.js';

connect_db();

const app = express();

app.use(express.json());

app.use('/api/users', user_routes);
app.use("/api/posts", post_routes);

app.use('/', (req, res) => {
  res.send('API...');
});

app.use(not_found);
app.use(error_handler);

app.listen(4000, console.log('Server running on port 4000'));
