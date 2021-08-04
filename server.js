const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');


connectDB();
app.use(express.json())

app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/cart',require('./routes/api/cart'));
app.use('/api/order',require('./routes/api/order'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000 ;
app.listen(PORT,(req,res) => console.log(`running in ${PORT}`));