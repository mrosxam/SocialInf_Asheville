const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.static(path.join(__dirname, '.')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
