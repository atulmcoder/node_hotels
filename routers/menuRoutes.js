const express = require('express');
const router = express.Router();
 const Menu = require('../models/menu');


router.post('/',async (req,res)=>{

   try{
    const data = req.body;
    const newMenu = new Menu(data);
   const savedMenu = await newMenu.save();
   console.log('Menu saved successfully:');
    res.status(201).json(savedMenu);

   }catch(err){
       console.error('Error saving menu:', err);
       res.status(500).send('Error saving menu: ' + err.message);
   }
});


  router.get('/', async (req,res)=>{
    try{
        const data = await Menu.find();
        res.status(200).json(data);
    }catch(err){
        console.error('Error fetching menu:', err);
       res.status(500).send('Error fetching menu: ' + err.message);
   }
});


router.get('/:taste', async (req,res)=>{

    try{
         const swad = req.params.taste;
        if(swad == 'sweet' || swad == 'spicy' || swad == 'sour'){ 
        const data = await Menu.find({ dish_taste: swad });
        res.status(200).json(data);
    }else {
            res.status(400).send('Invalid taste type. Please use sweet, spicy, or sour.');
        }
    }catch(err){
        console.error('Error fetching menu by taste:', err);
       res.status(500).send('Error fetching menu by taste: ' + err.message);
   }
});

router.put('/:id', async(req,res) => {
  try{
    const menuid = req.params.id;
    const updatedata = req.body;
    const response = await Menu.findByIdAndUpdate(menuid, updatedata,{
      new: true,
      runValidators: true
    });

    if(!response){
      return res.status(404).send('Menu not found');
    }
    console.log('Menu updated successfully:');
    res.status(200).json(response);

  }catch(err){
    console.error('Error updating menu:', err);
    res.status(500).send('Error updating menu: ' + err.message);
  }
})

router.delete('/:id', async(req,res) =>{
  try{
    const menuId = req.params.id;

    const response = await Menu.findByIdAndDelete(menuId)

    if(!response){
      return res.status(404).send('Menu not found');
    }

    console.log('data deleted succesfully')
    res.status(200).send(response)

  }catch(err){
    console.error('intenal error:', err)
res.status(500).send(err)
  }
})

module.exports = router;