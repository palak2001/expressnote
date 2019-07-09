const express= require('express');
const app= express();

app.get('/', (req,res) => {
    res.send('Heyyyaa :p');
    res.end();
});

app.listen(8000, () => { console.log('Listening to the port 8000.....')});