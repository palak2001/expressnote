
const express= require('express');
const router=express.Router();
const Joi= require('joi');
const startupDebug= require('debug')('app: startup');

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

//viewing the list of villas
router.get('/', (req,res)=>{
    if(!villas)
    return res.send(404);
    return res.send(villas);
});

//viewing a particular villa wth given id
router.get('/:id', (req,res)=>{
    const villa= villas.find(v=> v.id===parseInt(villas.params.id));
    if(!villa)
    return res.send(404);
    return res.send(villa);
});

//creating the new villa
router.post('/', (req,res)=>{
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