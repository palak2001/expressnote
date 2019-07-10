const Joi= require('joi');
const express= require('express');
const app= express();


const courses= [
    { id:1 , name: 'palak'},
    { id:2 , name: 'naresh'},
    { id:3 , name: 'saroj'},
    { id:4 , name: 'vishal'},
];

app.use(express.json());
//express.json is a middleware funtion
//It looks into the body of request and if there s a json fike, it returns it to response as json object

app.get('/', (req,res) => {
    res.send('Heyyyaa :p');
    res.end();
});
//Second argument to get funtion is also another middleware function as it takes a complete req-res cycle

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find( c => c.id===parseInt(req.params.id));
    if(!course)
    res.status(404);
    else
    res.send(course);
});

app.post('/api/courses', (req,res) => {
    

    const schema={
        name: Joi.string.min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    
    const course={
        id: courses.length +1 ,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port= process.env.PORT || 8000;

app.listen(port, () => { console.log(`Listening to the port ${port}.....`)})