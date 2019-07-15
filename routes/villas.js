const mongoose=require('mongoose');
const express= require('express');
const router=express.Router();
const Joi= require('joi');
const startupDebug= require('debug')('app: startup');

/*
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
];*/

const VillaSchema={
    name: { type: String , required: true},
    address: [ String ]
}

const Villa= mongoose.model('Villa', VillaSchema);

//viewing the list of villas
router.get('/', async (req,res)=>{
    const villa= await Villa.find().sort(name);
    if(!villa)
    return res.send(404);
    return res.send(villa);
});

//viewing a particular villa wth given id
router.get('/:id', async (req,res)=>{
    const villa= await Villa.findById(req.params.id);
    if(!villa)
    return res.send(404);
    return res.send(villa);
});

//creating the new villa
router.post('/', async (req,res)=>{
    const {error}= validation(req.body);   
    if (error) return res.status(400).send(error.details[0].message);

    const villa= Villa.create(req.params.id,{id: villas.length() +1, address: req.body.address});
    villas.push(villa);
    return res.send(villa);
});

//updating the value of a particular villa with given id
router.put('/api/villas/:id', (req,res)=>{

    const {error}= validation(req.body);   
    if (error) return res.status(400).send(error.details[0].message);

    const villa= villas.find(v=> v.id===parseInt(villas.params.id));
    if(!villa)
    return res.send(404);
    villa.address=req.body();
    return res.send(villa);
});

//deleting the villa info with given id
router.delete('/:id', (req,res)=>{

    const {error}= validation(req.body);   
    if (error) return res.status(400).send(error.details[0].message);

    const villa= villas.find(v=> v.id===parseInt(villas.params.id));

    if(!villa)
    return res.send(404);

    const index= villas.indexOf(villa);
    villas.splice(index,1);
    res.send(villa);
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

module.exports = router;