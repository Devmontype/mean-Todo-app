const express=require('express');
const app=express();
const cors=require('cors');
const route=require('./router');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(route);
app.listen(3000,()=>{
    console.log('app listening on port 3000');
});