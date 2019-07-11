const startupDebug= require(debug)()
const express= require(express());
const app= express();
const port= process.env.PORT||3000;

const villas=[
    {
        id: 1,
        address: 'Mount Everest'
    },
    {
        id: 2,
        address: 'Black Hole'
    },
    {
        id: 3,
        address: 'Bermuda Triangle'
    },
    {
        id: 4,
        address: 'Dead Sea'
    }
];

app.use(express.json());
//receiving the home page
app.get('/', (req,res) => {
    return res.write("Welcome to the home page");
});

//viewing the list of villas
app.get('/api/villas', (req,res)=>{
    if(!villas)
    return res.send(404);
    return res.send(villas);
});

//viewing a particular villa wth given id
app.get('.api/villas/:id', (req,res)=>{
    const villa= villas.find(v=> v.id===parseInt(villas.params.id));
    if(!villa)
    return res.send(404);
    return res.send(villa);
});

//creating the new villa
app.post('/api/villas', (req,res)=>{
    const {error}= validation(req.body);   
    if (error) return res.status(400).send(error.details[0].message);
    const villa={
        id: villas.length() +1 ,
        address: req.body.address
    }
    villas.push(villa);
    return res.send(villa);
});

//updating the value of a particular villa with given id
app.put('/api/villas/:id', (req,res)=>{
    const villa= villas.find(v=> v.id===parseInt(villas.params.id));
    if(!villa)
    return res.send(404);
    villa.address=req.body();
    return res.send(villa);
});

//deleting the villa info with given id
app.delete('/api/villas/:id', (req,res)=>{
    const villa= villas.find(v=> v.id===parseInt(villas.params.id));
    if(!villa)
    return res.send(404);
    //delete
    return res.send(villas);
});

//user info validation function
function validation(villa)
{
    startupDebug('Validation the info by user....');
    const schema={
        address: Joi.string.min(3).required
    };
    return Joi.validate(villa, schema);
}

app.listen(port , ()=> startupDebug(`Listening to the port ${port}`));