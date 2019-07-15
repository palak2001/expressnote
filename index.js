const mongoose= require('mongoose');
const home= require('./routes/home');
const express= require('express');
const app= express();
const villas= require('./routes/villas');

mongoose.connect('mongodb+srv://admin:admin@gomo-wkcrl.mongodb.net/test?retryWrites=true&w=majority')

//receiving the home page

app.use('/api/villas', villas);
//app.use('/',home);

const port= process.env.PORT||3000;
app.listen(port , ()=> {console.log(`Listening to the port ${port}.....`)});

//Your unique External ID: 9da7e019-3da5-4bcf-8630-600149015275
//Atlas AWS IAM User ARN: arn:aws:iam::962727799805:user/atlas-data-lake