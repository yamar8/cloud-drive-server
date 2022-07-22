require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const multer = require('multer');

const upload = multer({dest: './uploads'});

const router = require('./routes/index.js');

app.use(express.json());    
app.use(require('cors')());

app.use('/api',router);

app.listen(PORT, ()=>console.log(`server is runnig => ${PORT}`));

require('./DL/db.js').connect();
