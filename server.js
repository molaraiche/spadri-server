const express = require('express');
const cors = require('cors');
const blogsRouter = require('./routes/blogs_routes');
const connectSpadri = require('./databases/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
connectSpadri();
app.use('/api/blogs', blogsRouter);
// app.use('/api/products', productsRouter);
// app.use('/api/users', usersRouter);

// app.use('/api/admin', adminRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server Up at port ${PORT}`));
