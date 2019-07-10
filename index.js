const express= require('express');
const app= express();

const courses= [
    { id:1 , name: 'palak'},
    { id:2 , name: 'naresh'},
    { id:3 , name: 'saroj'},
    { id:4 , name: 'vishal'},
];

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Heyyyaa :p');
    res.end();
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find( c => c.id===parseInt(req.params.id));
    if(!course)
    res.status(404);
    else
    res.send(course);
})

app.post('/api/courses', (req,res) =>{
    const course={
        id: courses.length +1 ,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

const port= process.env.PORT || 8000;

app.listen(port, () => { console.log(`Listening to the port ${port}.....`)})