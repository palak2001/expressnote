const express= require('express');
const app= express();

app.get('/', (req,res) => {
    res.send('Heyyyaa :p');
    res.end();
});

const port= process.env.PORT || 8000;

app.listen(port, () => { console.log(`Listening to the port ${port}.....`)})