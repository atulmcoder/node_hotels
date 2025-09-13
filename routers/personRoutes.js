const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/',async (req,res)=>{
     
   try{
    const data = req.body;
    const newPerson = new Person(data);
   const savedPerson = await newPerson.save();
   console.log('Person saved successfully:');
    res.status(201).json(savedPerson);

   }catch(err){
       console.error('Error saving person:', err);
       res.status(500).send('Error saving person: ' + err.message);
   }
});


router.get('/', async (req,res)=>{
    try{
        const data = await Person.find();
        res.status(200).json(data);
    }catch(err){
        console.error('Error fetching persons:', err);
       res.status(500).send('Error fetching persons: ' + err.message);
   }
});

router.get('/:work', async (req,res)=>{

    try{
         const workType = req.params.work;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){ 
        const data = await Person.find({ work: workType });
        res.status(200).json(data);
    }else {
            res.status(400).send('Invalid work type. Please use chef, waiter, or manager.');
        }
    }catch(err){
        console.error('Error fetching persons by work:', err);
       res.status(500).send('Error fetching persons by work: ' + err.message);
   }
});

router.put('/:id', async(req,res) => {
    try{
const personId = req.params.id;
const updateData = req.body;

const response = await Person.findByIdAndUpdate(personId, updateData, { new: true ,
runValidators: true
});
if(!response){
    return res.status(404).send('Person not found');
}

console.log('Person updated successfully:');
res.status(200).json(response);
        
    } catch(err){
        console.error('Error updating person:', err);
       res.status(500).send('Error updating person: ' + err.message);
    }
})


router.delete('/:id', async(req,res) => {
 try{
const personId = req.params.id;

const response = await Person.findByIdAndDelete(personId);
if(!response){
    return res.status(404).send('Person not found');
}

     res.status(200).send({ message: 'Person deleted successfully', data: response });
} catch(err){
    console.error('Error deleting person:', err);
   res.status(500).send('Error deleting person: ' + err.message);
}
})

module.exports = router;