const express= require(express());
const app= express();
const port= process.env.PORT||3000;

app.use(express.json());
//receiving the home page
app.get('/', (req,res) => {
    res.write("Welcome to the home page");
});

//viewing the list of villas
app.get('/api/villas', (req,res)=>{
    if(!villas)
    res.send(404);
    else
    res.send(villas);
});

//viewing a particular villa wth given id
app.get('.api/villas/:id', (req,res)=>{
    const villa= villas.find(v=> v.id===parseInt(villas.params.id));
    if(!villa)
    res.send(404);
    else
    res.send(villa);
});

//creating the new villa
app.post('/api/villas', (req,res)=>{
    const villa={
        id: villas.length() +1 ,
        address: 'Heaven'
    }
    villas.push(villa);
    res.send(villa);
});

//updating the value of a particular villa with given id
app.put('/api/villas/:id', (req,res)=>{
    const villa= villas.find(v=> v.id===parseInt(villas.params.id));
    if(!villa)
    res.send(404);
    villa.address=req.body();
    res.send(villa);
});

//deleting the villa info with given id
app.delete('/api/villas/:id', (req,res)=>{
    const villa= villas.find(v=> v.id===parseInt(villas.params.id));
    if(!villa)
    res.send(404);
    //delete
    res.send(villas);
});