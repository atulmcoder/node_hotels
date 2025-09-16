const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT ||5000;
const db = require('./db');
const Menu = require('./models/menu');
const Person = require('./models/person');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());


app.get('/', async (req,res)=>{
    res.send(' Welcome to our kitchen sir !');
});


 const personRouter = require('./routers/personRoutes');
 app.use('/person', personRouter);

 const menuRouter = require('./routers/menuRoutes');
 app.use('/menu', menuRouter);

 




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

// app.get('/idli',(req,res)=>{
// let costmaige_idli = {
//   name: ' rva idli',
//   size: '10cm',
//   price: 100
// }

//     res.send( costmaige_idli );
// });

// app.post('/items',(req,res)=>{
//     res.send('data is saved!');
//     console.log(req.body);
// });