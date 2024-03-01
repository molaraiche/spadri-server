require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/error_handler');
const bodyParser = require('body-parser');
const blogsRouter = require('./routes/blogs_routes');
const productsRouter = require('./routes/products_routes');
const loginRouter = require('./routes/login_routes');
const adminRouter = require('./routes/admin_routes');
const contactRouter = require('./routes/contact_routes');
const connectSpadri = require('./databases/database');

const app = express();

app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());

connectSpadri();

app.use('/api/blogs', blogsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', loginRouter);
app.use('/api/contact', contactRouter);

app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('An error occurred while starting the server:', error);
  }
});
