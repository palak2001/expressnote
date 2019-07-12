const dbdebug= require('debug')('app:db');
const home= require('./routes/home');
const express= require('express');
const app= express();
const villas= require('./routes/villas');

const port= process.env.PORT||3000;

app.use(express.json());
//receiving the home page
app.use('/',home);
app.use('/api/villas', villas);

app.listen(port , ()=> {console.log(`Listening to the port ${port}.....`)});